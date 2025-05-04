from flask import Blueprint, request, jsonify
from app.db import get_connection

jobs_blueprint = Blueprint('jobs', __name__)

@jobs_blueprint.route('/data', methods=['GET'])
def get_all_data():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM jobs ORDER BY created_at ASC LIMIT 10")
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    
from flask import request, jsonify
from sentence_transformers import SentenceTransformer, util
import torch

# Load the model once globally
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_job_mapping(query):
    # List of known jobs in your database — expand as needed
    job_descriptions = [
        "electrician", "plumber", "construction worker", "mechanic", "welder",
        "carpenter", "painter", "machine operator", "forklift operator",
        "delivery driver", "truck driver", "security guard", "housekeeper",
        "janitor", "landscaper", "gardener", "factory worker", "assembler",
        "tailor", "seamstress", "baker", "butcher", "barber", "hairdresser",
        "cleaner", "laundry worker", "AC technician", "auto electrician",
        "diesel mechanic", "maintenance worker", "mason", "paver", "roofer",
        "scaffolder", "tile setter", "warehouse worker", "helper", "fitter",
        "refrigeration technician", "field technician", "packaging worker"
    ]
    job_embeddings = model.encode(job_descriptions, convert_to_tensor=True)
    query_embedding = model.encode(query, convert_to_tensor=True)
    cosine_scores = util.cos_sim(query_embedding, job_embeddings)[0]
    return job_descriptions[torch.argmax(cosine_scores)]

@jobs_blueprint.route('/data/paginated', methods=['POST'])
def get_paginated_data():
    conn = None
    try:
        data = request.json or {}
        page = data.get('page', 1)
        limit = data.get('limit', 10)
        offset = (page - 1) * limit

        sector = data.get('sector')
        state = data.get('state')
        district = data.get('district')
        min_salary = data.get('min_salary')
        max_salary = data.get('max_salary')
        job_title = data.get('job_title')
        experience = data.get('experience')

        base_query = "FROM jobs WHERE 1=1"
        filters = []
        params = []

        # Apply filters
        if sector:
            base_query += " AND sid_sector_name = %s"
            params.append(sector)
        if state:
            base_query += " AND location_state = %s"
            params.append(state)
        if district:
            base_query += " AND location_district = %s"
            params.append(district)
        if min_salary is not None:
            base_query += " AND min_ctc_monthly >= %s"
            params.append(min_salary)

        if max_salary is not None:
            base_query += " AND max_ctc_monthly <= %s"
            params.append(max_salary)


        if job_title:
            mapped_title = get_job_mapping(job_title)  # <-- Semantic mapping here
            base_query += " AND LOWER(job_title) LIKE LOWER(%s)"
            params.append(f"%{mapped_title}%")

        if experience:
            base_query += " AND min_experience LIKE %s"
            params.append(f"%{experience}%")

        # Execute DB queries
        conn = get_connection()
        with conn.cursor() as cursor:
            count_query = f"SELECT COUNT(*) AS total {base_query}"
            cursor.execute(count_query, params)
            total_records = list(cursor.fetchone().values())[0]

            data_query = f"SELECT * {base_query} ORDER BY created_at ASC LIMIT %s OFFSET %s"
            paginated_params = params + [limit, offset]
            cursor.execute(data_query, paginated_params)
            result = cursor.fetchall()

        return jsonify({
            "total_records": total_records,
            "page": page,
            "limit": limit,
            "data": result
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if conn:
            conn.close()



@jobs_blueprint.route('/sectors', methods=['GET'])
def get_all_sectors():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT DISTINCT sid_sector_name FROM jobs WHERE sid_sector_name IS NOT NULL")
            rows = cursor.fetchall()
            sectors = [row['sid_sector_name'] for row in rows]
        return jsonify({"sectors": sectors}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@jobs_blueprint.route('/jobs/category', methods=['GET'])
def get_filtered_jobs():
    conn = None  # Initialize conn here
    sector = request.args.get('sector')
    state = request.args.get('state')
    district = request.args.get('district')
    min_salary = request.args.get('min_salary', type=int)
    max_salary = request.args.get('max_salary', type=int)

    query = "SELECT * FROM jobs WHERE 1=1"
    params = []

    if sector:
        query += " AND sid_sector_name = %s"
        params.append(sector)
    if state:
        query += " AND location_state = %s"
        params.append(state)
    if district:
        query += " AND location_district = %s"
        params.append(district)
    if min_salary is not None:
        query += " AND max_ctc_monthly >= %s"
        params.append(min_salary)
    if max_salary is not None:
        query += " AND min_ctc_monthly <= %s"
        params.append(max_salary)

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:  # Only close if connection was successful
            conn.close()


