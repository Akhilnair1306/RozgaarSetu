import React from 'react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    title: "Create Your Profile",
    description: "Sign up and build your detailed worker profile highlighting your skills, experience, and preferences.",
    icon: "👤",
    color: "bg-blue-500"
  },
  {
    title: "Browse Personalized Jobs",
    description: "Our AI matching engine finds the perfect jobs based on your profile and preferences.",
    icon: "🔍",
    color: "bg-green-500"
  },
  {
    title: "Apply with One Click",
    description: "Apply to multiple jobs easily with your saved profile information.",
    icon: "✅",
    color: "bg-purple-500"
  },
  {
    title: "Get Hired Faster",
    description: "Connect directly with employers and receive updates throughout the hiring process.",
    icon: "🤝",
    color: "bg-amber-500"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How BlueCollarFind Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to find your perfect job or hire skilled workers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              )}
              
              <Card className="p-6 text-center h-full flex flex-col items-center card-hover">
                {/* Step number and icon */}
                <div className="relative mb-4">
                  <div className={`w-16 h-16 rounded-full ${step.color} bg-opacity-10 flex items-center justify-center mb-2`}>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step content */}
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;