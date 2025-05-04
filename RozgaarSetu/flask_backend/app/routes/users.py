from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app.db import get_connection
import datetime
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json()

    # Extract fields from the request body
    full_name = data.get('full_name')
    user_email = data.get('user_email')
    phone_number = data.get('phone_number')
    location_state = data.get('location_state')
    location_city = data.get('location_city')
    location_country = data.get('location_country')
    password = data.get('password')
    dob = data.get('dob')
    gender = data.get('gender')
    skills = data.get('skills')
    education = data.get('education')
    experience = data.get('experience')
    preferred_job_type = data.get('preferred_job_type')

    # Check if required fields are present
    if not all([full_name, user_email, password, dob, gender]):
        return jsonify({"error": "Missing required fields"}), 400

    # Validate skills as an array
    if not isinstance(skills, list):
        return jsonify({"error": "Skills should be an array"}), 400

    password_hash = generate_password_hash(password)
    created_at = datetime.datetime.utcnow()

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            # Check if user already exists
            cursor.execute("SELECT id FROM users WHERE user_email = %s", (user_email,))
            if cursor.fetchone():
                return jsonify({"error": "User already exists"}), 409

            # Insert the new user into the database
            cursor.execute("""
                INSERT INTO users (full_name, user_email, phone_number, location_state, location_city, 
                                   location_country, password_hash, dob, gender, skills, education, experience, 
                                   preferred_job_type, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (full_name, user_email, phone_number, location_state, location_city, location_country, 
                  password_hash, dob, gender, ','.join(skills), education, experience, preferred_job_type, created_at))

            conn.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@users_blueprint.route('/users/<string:user_email>/edit', methods=['PUT'])
def edit_user_by_email(user_email):
    data = request.get_json()

    # Fields allowed to be updated
    updatable_fields = [
        "full_name", "phone_number", "location_state", "location_city", "location_country",
        "dob", "gender", "skills", "education", "experience", "preferred_job_type"
    ]

    updates = []
    values = []

    for field in updatable_fields:
        if field in data:
            updates.append(f"{field} = %s")
            if field == "skills" and isinstance(data[field], list):
                values.append(','.join(data[field]))
            else:
                values.append(data[field])

    if not updates:
        return jsonify({"error": "No valid fields provided to update"}), 400

    values.append(user_email)  # For WHERE clause

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            # Check if user exists
            cursor.execute("SELECT id FROM users WHERE user_email = %s", (user_email,))
            if not cursor.fetchone():
                return jsonify({"error": "User not found"}), 404

            # Perform update
            cursor.execute(f"""
                UPDATE users
                SET {', '.join(updates)}
                WHERE user_email = %s
            """, tuple(values))

            conn.commit()

        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


@users_blueprint.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('user_email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Missing email or password"}), 400

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE user_email = %s", (email,))
            user = cursor.fetchone()
            if not user or not check_password_hash(user['password_hash'], password):
                return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "user_name": user["user_name"],
                "user_email": user["user_email"],
                "location": user["location"],
                "occupation": user["occupation"],
                "applied_jobs": user.get("applied_jobs", "")
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@users_blueprint.route('/users/email/<string:user_email>', methods=['GET'])
def get_user_by_email(user_email):
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, full_name, user_email, phone_number, location_state, location_city,location_country, password_hash, dob, gender, skills, education, experience, preferred_job_type, created_at FROM users WHERE user_email = %s", (user_email,))
            user = cursor.fetchone()

            if not user:
                return jsonify({"error": "User not found"}), 404

        return jsonify({"user": user}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@users_blueprint.route('/locations/states', methods=['GET'])
def get_states_and_cities():
    try:
        file_path = os.path.join(current_app.root_path, 'india.json')
        with open(file_path, 'r', encoding='utf-8') as f:
            india_data = json.load(f)

        states_info = []
        for state in india_data.get("states", []):
            states_info.append({
                "state_name": state["name"],
                "state_code": state["state_code"],
                "cities": [city["name"] for city in state.get("cities", [])]
            })

        return jsonify(states_info), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users_blueprint.route('/locations/find_by_city', methods=['POST'])
def get_location_by_city():
    data = request.get_json()
    selected_city = data.get('city')

    if not selected_city:
        return jsonify({"error": "City is required"}), 400

    try:
        with open('locations.json', 'r', encoding='utf-8') as f:
            india_data = json.load(f)

        for state in india_data.get("states", []):
            for city in state.get("cities", []):
                if city["name"].lower() == selected_city.lower():
                    return jsonify({
                        "city": city["name"],
                        "state": state["name"],
                        "country": india_data["name"]
                    }), 200

        return jsonify({"error": "City not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_blueprint.route('/users/recommendations/<string:user_email>', methods=['GET'])
# @recommendation_blueprint.route('/users/recommend/<int:user_id>', methods=['GET'])
def recommend_jobs(user_email):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Get user data
        cursor.execute("SELECT * FROM users WHERE user_email = %s", (user_email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Build user sentence
        user_sentence = ' '.join([
            str(user.get('full_name', '')),
            str(user.get('gender', '')),
            str(user.get('education', '')),
            str(user.get('experience', '')),
            str(user.get('preferred_job_type', '')),
            str(user.get('location_state', '')),
            str(user.get('location_country', '')),
            str(user.get('location_city', '')),
            ' '.join(user.get('skills', '').split(','))
        ])

        # Get job data
        cursor.execute("SELECT * FROM jobs")
        jobs = cursor.fetchall()
        if not jobs:
            return jsonify({"error": "No jobs found"}), 404

        job_descriptions = []
        job_ids = []

        for job in jobs:
            job_text = ' '.join([
                str(job.get('job_title', '')),
                str(job.get('job_description', '')),
                str(job.get('industry_name', '')),
                str(job.get('sector_name', '')),
                str(job.get('location_state', '')),
                str(job.get('location_country', '')),
            ])
            job_descriptions.append(job_text)
            job_ids.append(job['id'])


        vectorizer = TfidfVectorizer()
        all_sentences = [user_sentence] + job_descriptions
        tfidf_matrix = vectorizer.fit_transform(all_sentences)

        user_vector = tfidf_matrix[0]
        job_vectors = tfidf_matrix[1:]
        similarities = cosine_similarity(user_vector, job_vectors)[0]

        top_indices = similarities.argsort()[-5:][::-1]
        recommended_jobs = [jobs[i] for i in top_indices]

        return jsonify({
            "user_id": user_email,
            "recommended_jobs": recommended_jobs
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            try:
                cursor.close()
            except:
                pass
            try:
                conn.close()
            except:
                pass

