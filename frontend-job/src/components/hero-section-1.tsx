import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Input } from './ui/input';
import { Link, useNavigate } from 'react-router-dom';
import HeroHeader from './Home/NavBar';
import CategoryCard from './Home/CategoryCard';
import HowItWorks from './Home/HowitWorks';
import JobCard from './Home/JobCard';
import { DataContext } from '@/context/DataContext';
import axios from 'axios';

export function HeroSection() {
  const { data } = useContext(DataContext);
  const [sectors, setSectors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          'https://642f-114-143-151-74.ngrok-free.app/api/sectors',
          { withCredentials: true }
        );
        setSectors(response?.data?.sectors || []);
      } catch (err) {
        console.error('Error fetching sectors:', err);
      }
    };

    fetchSectors();
  }, []);

  const displayedCategories = sectors?.slice(0, 8);

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      job_title: query,
      state: location,
      page: 1,
      limit: 10,
    };
    try {
      setLoading(true);
      navigate('/jobs', { state: requestData });
    } catch (error) {
      console.error('Error navigating to jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroHeader />
      <main>
        <section className="pt-24 md:pt-36 w-3/4 mx-auto">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              Connecting Skilled Workers with the Right Jobs
            </h1>
            <p className="text-lg mb-8">
              Connect with thousands of employers looking for skilled workers like you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Job title or keywords..."
                  className="pl-10 h-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {/* <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                <Input
                  type="text"
                  placeholder="Location..."
                  className="pl-10 h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div> */}
              <Button type="submit" className="h-12 px-8 font-semibold">
                Find Jobs
              </Button>
            </form>
          </div>
        </section>

        {/* Displaying Categories */}
        <section className="py-16 w-3/4 mx-auto">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore Job Categories</h2>
            <p className="text-gray-600 mb-10">
              Find opportunities in these high-demand blue-collar sectors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedCategories?.map((sector, index) => (
                <div key={index}>
                  <CategoryCard categoryName={sector} />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              {/* <Button asChild className="primary-btn">
                <Link to="/categories">View All Categories</Link>
              </Button> */}
            </div>
          </div>
        </section>

        <div className="w-3/4 mx-auto">
          <HowItWorks />
        </div>

        {/* Featured Jobs */}
        <section className="py-16 bg-white w-3/4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Job Opportunities</h2>
            <p className="text-xl text-gray-600">
              Latest openings from top employers looking for skilled professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="primary-btn">
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
