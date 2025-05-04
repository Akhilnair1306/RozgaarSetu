import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, MapPin, Calendar, User } from 'lucide-react';
import HeroHeader from '@/components/Home/NavBar';
import { DataContext, JobData } from '@/context/DataContext';
// import { JobData } from '@/types/JobData';  // Import your JobData type

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useContext(DataContext);

  // Find the job with the matching ID
  const job = data.find((job: JobData) => job.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="fixed top-0">
          <HeroHeader />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')} className="primary-btn">
            Browse All Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Format salary for display
  const formatSalary = (min: number, max: number, period: string) => {
    return `₹${min.toLocaleString()}-${max.toLocaleString()}/${period}`;
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="pt-16 pb-12">
      <div className="fixed top-0">
        <HeroHeader />
      </div>
      <div className="container mx-auto p-4">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Job Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                {/* Job Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.job_title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="font-medium">{job.company_name}</span>
                      <span className="mx-2">•</span>
                      <span>{job.location_district}, {job.location_state}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">{job.sector_name}</Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {formatSalary(job.min_ctc_monthly, job.max_ctc_monthly, 'month')}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        {job.sid_sector_name.charAt(0).toUpperCase() + job.sid_sector_name.slice(1)}
                      </Badge>
                      {/* Add other badges or conditions for the job */}
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                  <p className="text-gray-700 mb-4">{job.job_description}</p>
                </div>

                {/* Job Requirements */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {/* Assuming there might be some form of requirements */}
                    {/* Replace this with actual job requirements data if available */}
                    <li className="text-gray-700">Minimum {job.min_experience} months experience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Summary and Apply Section */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Summary</h2>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-md h-fit">
                      <Briefcase size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Job Type</div>
                      <div className="font-medium">{job.sector_name}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-green-100 p-2 rounded-md h-fit">
                      <MapPin size={18} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{job.location_district}, {job.location_state}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-purple-100 p-2 rounded-md h-fit">
                      <Calendar size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Posted Date</div>
                      <div className="font-medium">{formatDate(job.created_at)}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-orange-100 p-2 rounded-md h-fit">
                      <User size={18} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium">{job.sid_sector_name.charAt(0).toUpperCase() + job.sid_sector_name.slice(1)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
                <p className="text-gray-600 mb-6">Submit your application now and take the first step towards your new career.</p>
                <Button className="primary-btn w-full" onClick={() => window.open(job.apply_url, "_blank")}>Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
