import React, { useEffect, useState } from 'react';
import JobCard from '@/components/Home/JobCard';
import HeroHeader from '@/components/Home/NavBar';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';

type JobData = {
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

const JobView = () => {
    const location = useLocation();
    const requestData = (location.state || {}) as {
        job_title?: string;
        state?: string;
        page?: number;
        limit?: number;
    };

    const [jobs, setJobs] = useState<JobData[]>([]);
    const [page, setPage] = useState(requestData.page || 1);
    const [limit] = useState(requestData.limit || 10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState(requestData.job_title || '');
    const [filterExperience, setFilterExperience] = useState<number | null>(null);
    const [selectedState, setSelectedState] = useState(requestData.state || '');
    const [states, setStates] = useState<{ value: string; label: string }[]>([]);
    const [minSalary, setMinSalary] = useState<number | null>(null);
    const [maxSalary, setMaxSalary] = useState<number | null>(null);

    const totalPages = Math.ceil(totalRecords / limit);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(
                    'https://642f-114-143-151-74.ngrok-free.app/api/locations/states',
                    { withCredentials: true }
                );
                const stateOptions = response.data.map((state: any) => ({
                    value: state.state_code,
                    label: state.state_name,
                }));
                setStates(stateOptions);
            } catch (err) {
                console.error('Error fetching states:', err);
            }
        };

        fetchStates();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    'https://642f-114-143-151-74.ngrok-free.app/api/data/paginated',
                    {
                        page,
                        limit,
                        job_title: searchTerm,
                        state: selectedState,
                        experience: filterExperience,
                        min_salary: minSalary,
                        max_salary: maxSalary,
                    }
                );
                setJobs(response.data.data);
                setTotalRecords(response.data.total_records);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page, limit, searchTerm, selectedState, filterExperience, minSalary, maxSalary]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    const renderPageButtons = () => {
        const pages = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        if (startPage > 1) pages.push(<span key="start-ellipsis">...</span>);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded ${page === i ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) pages.push(<span key="end-ellipsis">...</span>);

        return pages;
    };

    const renderSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-6 bg-gray-200 mb-4 w-1/2 rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 w-full rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 w-2/3 rounded"></div>
        </div>
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleFilterStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStateLabel = e.target.value;
        setSelectedState(selectedStateLabel);
        setPage(1);
    };

    const handleFilterExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedExperience = e.target.value ? parseInt(e.target.value) : null;
        setFilterExperience(selectedExperience);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="fixed top-0 w-full z-10">
                <HeroHeader />
            </div>

            {/* Search & Filter UI */}
            <div className="w-3/4 mx-auto pt-28 pb-6 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search job title or company..."
                        className="px-4 py-2 w-full sm:w-1/3 border border-gray-300 rounded-md shadow-sm"
                    />

                    <select
                        value={selectedState}
                        onChange={handleFilterStateChange}
                        className="px-4 py-2 w-full sm:w-1/4 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">All States</option>
                        {states.map((state) => (
                            <option key={state.value} value={state.label}>
                                {state.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterExperience ?? ''}
                        onChange={handleFilterExperienceChange}
                        className="px-4 py-2 w-full sm:w-1/4 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Any Experience</option>
                        <option value="0">0 months (0+ years)</option>
                        <option value="12">12 months (1+ years)</option>
                        <option value="24">24 months (2+ years)</option>
                        <option value="36">36 months (3+ years)</option>
                        <option value="48">48 months (4+ years)</option>
                        <option value="60">60 months (5+ years)</option>
                    </select>

                    <Input
                        type="number"
                        value={minSalary ?? ''}
                        onChange={(e) => setMinSalary(e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="Min Salary"
                        className="px-4 py-2 w-full sm:w-1/4 border border-gray-300 rounded-md shadow-sm"
                    />

                    <Input
                        type="number"
                        value={maxSalary ?? ''}
                        onChange={(e) => setMaxSalary(e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="Max Salary"
                        className="px-4 py-2 w-full sm:w-1/4 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            {/* Job Listings Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4 py-8 mx-auto w-3/4">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-6 bg-white shadow-md rounded-lg">
                            {renderSkeleton()}
                        </div>
                    ))
                    : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div
                                key={job.id}
                                className="animate-fade-in-up transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg bg-white p-6 shadow-md"
                            >
                                <JobCard job={job} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">No jobs found.</div>
                    )}
            </div>

            {error && (
                <div className="text-center text-red-500 mt-4">
                    Error: {error}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {renderPageButtons()}
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobView;
