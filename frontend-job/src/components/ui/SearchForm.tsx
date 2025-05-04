import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Input } from './input';

interface SearchFormProps {
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Job title or keywords..."
            className="pl-10 h-12 bg-white shadow-md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
          <Input
            type="text"
            placeholder="Location..."
            className="pl-10 h-12 bg-white shadow-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" className="accent-btn h-12 px-8 font-semibold">
          Find Jobs
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;