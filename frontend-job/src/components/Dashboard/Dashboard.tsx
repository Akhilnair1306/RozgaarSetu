"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import JobCard from "../Home/JobCard";
import HeroHeader from "../Home/NavBar";

type Job = {
  apply_url: string;
  company_name: string;
  created_at: string;
  id: string;
  in_hand_monthly: number;
  industry_name: string;
  job_description: string;
  job_id: string;
  job_title: string;
  location_country: string;
  location_district: string;
  location_state: string;
  max_ctc_monthly: number;
  min_ctc_monthly: number;
  min_experience: number;
  posted_on: string;
  sector_name: string;
  sid_sector_name: string;
};

const Dashboard: React.FC = () => {
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const userEmail = Cookies.get("user_email");
        if (!userEmail) {
          setError("User not logged in.");
          return;
        }

        const res = await axios.get(
          `https://642f-114-143-151-74.ngrok-free.app/api/users/recommendations/${userEmail}`,
          { withCredentials: true }
        );

        setRecommendedJobs(res.data.recommended_jobs || []);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <HeroHeader />
      <h1 className="text-3xl font-bold mb-6 text-center mt-32">Recommended Jobs for You</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : recommendedJobs.length === 0 ? (
        <p className="text-center text-gray-500">No job recommendations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
