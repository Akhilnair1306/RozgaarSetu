from flask import Flask, jsonify, request
import pymysql

app = Flask(__name__)

# Database connection settings
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "skill_india",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}

@app.route('/api/data', methods=['GET'])
def get_all_data():
    try:
        # Establishing the connection
        conn = pymysql.connect(**db_config)
        with conn.cursor() as cursor:
            # Replace 'your_table_name' with your actual table
            cursor.execute("SELECT * FROM jobs")
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/sectors', methods=['GET'])
def get_all_sectors():
    try:
        conn = pymysql.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute("SELECT DISTINCT sid_sector_name FROM jobs WHERE sid_sector_name IS NOT NULL")
            rows = cursor.fetchall()
            sectors = [row['sid_sector_name'] for row in rows]
        return jsonify({"sectors": sectors}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/jobs/category', methods=['GET'])
def get_filtered_jobs():
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
        conn = pymysql.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
