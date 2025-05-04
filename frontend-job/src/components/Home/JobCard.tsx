import React from 'react';
// import { JobListing } from '../data/jobListings';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { JobListing } from '@/data/JobListing';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { JobData } from '@/context/DataContext';

interface JobCardProps {
  job: JobData;
  className?: string;
}

const JobCard = ({ job, className = '' }: JobCardProps) => {
    // console.log(job, "job")
    const navigate = useNavigate()
  // Format salary range
//   const formatSalary = (min: number, max: number, period: string) => {
//     return `₹${min.toLocaleString()}-${max.toLocaleString()}/${period}`;
//   };

  // Format posted date to relative time
  const getRelativeTimeString = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <Card className={`overflow-hidden card-hover ${className}`}>
      <div className="p-5">
        {/* Header with company and featured badge */}
        <div className="flex justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.job_title}</h3>
          {/* {job.featured && (
            <Badge variant="default" className="accent-gradient">Featured</Badge>
          )} */}
        </div>
        
        {/* Company and location */}
        <div className="flex items-center text-gray-600 mb-3">
          <span className="font-medium">{job.company_name}</span>
          <span className="mx-2">•</span>
          <span> {job.location_district}, {job.location_state}, {job.location_country}</span>
        </div>
        
        {/* Job details */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            {job.sid_sector_name}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
            {/* {formatSalary(job.min_ctc_monthly, job.max_ctc_monthly, job.salary.period)} */}
            Min: {job.min_ctc_monthly}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
            {/* {formatSalary(job.min_ctc_monthly, job.max_ctc_monthly, job.salary.period)} */}
            Max: {job.max_ctc_monthly}
          </Badge>
          {/* <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
            {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
          </Badge> */}
        </div>
        
        {/* Job description - truncated */}
        <p className="text-gray-700 mb-4 line-clamp-2">
          {job.job_description}
        </p>
        
        {/* Footer with date and apply button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            Posted {getRelativeTimeString(job.posted_on)}
          </span>
          <Button className="primary-btn" onClick={() => navigate(`/jobs/${job.id}`)}>
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;