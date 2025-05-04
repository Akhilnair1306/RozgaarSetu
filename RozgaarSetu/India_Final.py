import requests
import pymysql
import time
from datetime import datetime, timedelta, timezone

# MySQL DB connection
conn = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="skill_india",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)
cursor = conn.cursor()

# API URL and headers
url = "https://api-fe.skillindiadigital.gov.in/api/jobs/filter"

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "language": "en",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sessionid": "SID.portal::Chrome::136.0.0.0::l0DleSDKgSz90S3Q4SsCp6DfEjyJr41J",
    "Referer": "https://www.skillindiadigital.gov.in/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}

# Function to fetch jobs
def fetch_new_jobs():
    # Request first page to get total count
    payload = {
        "Country": ["India"],
        "JobStatus": "Active",
        "PageNumber": 1,
        "PageSize": 1,  # Just to get total count
        "Sector": []
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    if response.status_code == 200 and "Data" in data:
        total_jobs = 0
        if "Data" in data and isinstance(data["Data"], dict):
            total_jobs = data["Data"].get("TotalCount")
            # facets = data["Data"].get("Facets")
            # if facets and isinstance(facets, dict):
            #     job_location_country_list = facets.get("JobLocationCountry")
            #     if isinstance(job_location_country_list, list) and len(job_location_country_list) > 0:
            #         india_data = job_location_country_list[0]
            #         if isinstance(india_data, dict):
            #             total_jobs = india_data.get("Count", 0)

        print(f"Total Active Jobs in India: {total_jobs}")
    else:
        print(f"Error fetching job data: {response.status_code}")
        print("Message:", data.get("Message", "Unknown error"))
        return  # Exit if there's an error fetching total jobs

    # Now fetch all job data page-wise
    page_size = 200
    total_pages = (total_jobs // page_size) + 1

    # Get current UTC time
    now = datetime.now(timezone.utc)
    threshold_time = now - timedelta(minutes=2)

    for page in range(1, total_pages + 1):
        payload["PageNumber"] = page
        payload["PageSize"] = page_size

        response = requests.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            print(f"Error on page {page}: {response.status_code}")
            print(f"Error on page {page}: {response.text}")
            break

        data = response.json()
        job_data = data.get("Data", {}).get("Results", [])

        print(f"Fetched page {page} with {len(job_data)} jobs")

        for job in job_data:
            posted_on_str = job.get("PostedOn")
            if not posted_on_str:
                continue  # Skip if no timestamp

            try:
                posted_on_time = datetime.fromisoformat(posted_on_str)
                if posted_on_time.tzinfo is None:
                    posted_on_time = posted_on_time.replace(tzinfo=timezone.utc)
            except Exception as e:
                print(f"Error parsing date: {e}")
                continue  # Skip malformed dates

            if posted_on_time >= threshold_time:
                print(f"New job found at {posted_on_time}: {job.get('JobTitle')}")
                cursor.execute("""
                    INSERT INTO jobs (
                        id, job_id, job_title, job_description, company_name,
                        industry_name, sector_name, sid_sector_name, min_ctc_monthly,
                        max_ctc_monthly, in_hand_monthly, posted_on,
                        location_district, location_state, location_country,
                        min_experience, apply_url
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON DUPLICATE KEY UPDATE job_title = VALUES(job_title)
                """,
                (
                    job.get("Id"),
                    job.get("JobId"),
                    job.get("JobTitle"),
                    job.get("JobDescription"),
                    job.get("CompanyName"),
                    job.get("IndustryName"),
                    job.get("SectorName"),
                    job.get("SidSectorName"),
                    job.get("MinCtcMonthly"),
                    job.get("MaxCtcMonthly"),
                    job.get("InHandMonthly"),
                    posted_on_str,
                    job.get("JobLocation", {}).get("District"),
                    job.get("JobLocation", {}).get("State"),
                    job.get("JobLocation", {}).get("Country"),
                    job.get("MinExperience"),
                    job.get("ApplyUrl")
                ))
                conn.commit()

        time.sleep(1)  # Avoid hitting rate limits

# Main function to run scraper every 2 minutes
def run_scraper_periodically():
    while True:
        fetch_new_jobs()  # Run the job fetch function
        print("Waiting for 2 minutes...")
        time.sleep(120)  # Wait for 2 minutes before running again

# Start the periodic scraper
run_scraper_periodically()

# Close the database connection (this part won't be reached because of the infinite loop)
cursor.close()
conn.close()