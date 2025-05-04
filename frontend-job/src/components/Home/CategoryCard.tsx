import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Hammer,
  Wrench,
  HardHat,
  Bolt,
  Paintbrush,
  TreePine,
  Building2,
} from 'lucide-react';

interface SimpleCategoryCardProps {
  categoryName: string;
}

const defaultData: Record<
  string,
  { icon: React.ReactNode; color: string; count: number }
> = {
  Construction: {
    icon: <HardHat />,
    color: 'bg-yellow-500',
    count: 120,
  },
  Plumbing: {
    icon: <Wrench />,
    color: 'bg-blue-500',
    count: 80,
  },
  Electrical: {
    icon: <Bolt />,
    color: 'bg-red-500',
    count: 95,
  },
  Painting: {
    icon: <Paintbrush />,
    color: 'bg-pink-500',
    count: 65,
  },
  Landscaping: {
    icon: <TreePine />,
    color: 'bg-green-500',
    count: 70,
  },
  'General Labor': {
    icon: <Hammer />,
    color: 'bg-gray-500',
    count: 150,
  },
  'Building Maintenance': {
    icon: <Building2 />,
    color: 'bg-indigo-500',
    count: 45,
  },
  Other: {
    icon: <Briefcase />,
    color: 'bg-purple-500',
    count: 30,
  },
};

const CategoryCard: React.FC<SimpleCategoryCardProps> = ({ categoryName }) => {
  const { icon, color, count } = defaultData[categoryName] || defaultData['Other'];

  return (
    <Link
      to={`/jobs?category=${encodeURIComponent(categoryName)}`}
      className="relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden card-hover bg-white shadow-md group h-3/4"
    >
      {/* Background hover overlay */}
      <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />

      {/* Icon */}
      <div className={`text-4xl mb-3 transform transition-transform duration-300 group-hover:scale-110 ${color.replace('bg-', 'text-')}`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{categoryName}</h3>

      {/* Count */}
      {/* <p className="text-sm text-gray-500">{count} jobs available</p> */}

      {/* Hover underline */}
      <div className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-purple-600" />
    </Link>
  );
};

export default CategoryCard;
