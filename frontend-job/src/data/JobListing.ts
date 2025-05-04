export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: {
      min: number;
      max: number;
      period: string;
    };
    type: string;
    category: string;
    description: string;
    requirements: string[];
    postedDate: string;
    featured: boolean;
    logo?: string;
  }
  
  export const jobListings: JobListing[] = [
    {
      id: "job1",
      title: "Senior Plumber",
      company: "Urban Plumbing Co.",
      location: "Delhi, India",
      salary: {
        min: 25000,
        max: 35000,
        period: "month"
      },
      type: "Full-time",
      category: "plumber",
      description: "We are seeking an experienced plumber to join our team for residential and commercial projects.",
      requirements: [
        "5+ years of plumbing experience",
        "Knowledge of pipe systems and plumbing codes",
        "Ability to read blueprints",
        "Valid driver's license"
      ],
      postedDate: "2023-04-28",
      featured: true
    },
    {
      id: "job2",
      title: "Electrician Helper",
      company: "Bright Spark Electrical",
      location: "Mumbai, India",
      salary: {
        min: 15000,
        max: 20000,
        period: "month"
      },
      type: "Full-time",
      category: "electrician",
      description: "Looking for an electrician helper to assist senior electricians in commercial and residential projects.",
      requirements: [
        "Basic knowledge of electrical systems",
        "Ability to follow instructions",
        "Safety conscious",
        "Willing to learn"
      ],
      postedDate: "2023-04-25",
      featured: false
    },
    {
      id: "job3",
      title: "Experienced Carpenter",
      company: "Wood Craft Interiors",
      location: "Bangalore, India",
      salary: {
        min: 22000,
        max: 30000,
        period: "month"
      },
      type: "Full-time",
      category: "carpenter",
      description: "Seeking skilled carpenter for high-end furniture and interior projects.",
      requirements: [
        "3+ years experience in carpentry",
        "Knowledge of different wood types",
        "Ability to read technical drawings",
        "Experience with power tools"
      ],
      postedDate: "2023-04-26",
      featured: true
    },
    {
      id: "job4",
      title: "Commercial Painter",
      company: "Color Masters Painting",
      location: "Chennai, India",
      salary: {
        min: 18000,
        max: 25000,
        period: "month"
      },
      type: "Contract",
      category: "painter",
      description: "Commercial painters needed for large office complex project.",
      requirements: [
        "Experience with commercial painting",
        "Knowledge of different paint types",
        "Ability to work at heights",
        "Team player"
      ],
      postedDate: "2023-04-22",
      featured: false
    },
    {
      id: "job5",
      title: "Delivery Driver",
      company: "Swift Logistics",
      location: "Hyderabad, India",
      salary: {
        min: 16000,
        max: 22000,
        period: "month"
      },
      type: "Full-time",
      category: "driver",
      description: "Looking for delivery drivers to handle last-mile deliveries in the city.",
      requirements: [
        "Valid driving license",
        "Knowledge of city roads",
        "Good communication skills",
        "Smartphone proficiency"
      ],
      postedDate: "2023-04-24",
      featured: false
    },
    {
      id: "job6",
      title: "Security Supervisor",
      company: "SafeGuard Security Services",
      location: "Pune, India",
      salary: {
        min: 20000,
        max: 28000,
        period: "month"
      },
      type: "Full-time",
      category: "security",
      description: "Security supervisor needed for corporate office building.",
      requirements: [
        "Prior security experience",
        "Leadership skills",
        "Knowledge of security protocols",
        "Basic computer knowledge"
      ],
      postedDate: "2023-04-20",
      featured: true
    },
    {
      id: "job7",
      title: "Hotel Cook",
      company: "Spice Garden Hotels",
      location: "Jaipur, India",
      salary: {
        min: 18000,
        max: 25000,
        period: "month"
      },
      type: "Full-time",
      category: "cook",
      description: "Experienced cook needed for our hotel restaurant specializing in North Indian cuisine.",
      requirements: [
        "2+ years cooking experience",
        "Knowledge of North Indian cuisine",
        "Food handling certification",
        "Team player"
      ],
      postedDate: "2023-04-21",
      featured: false
    },
    {
      id: "job8",
      title: "Office Cleaner",
      company: "CleanPro Services",
      location: "Ahmedabad, India",
      salary: {
        min: 12000,
        max: 16000,
        period: "month"
      },
      type: "Part-time",
      category: "cleaner",
      description: "Office cleaners needed for evening shifts in IT park.",
      requirements: [
        "Previous cleaning experience preferred",
        "Attention to detail",
        "Reliable and punctual",
        "Ability to follow instructions"
      ],
      postedDate: "2023-04-23",
      featured: false
    },
  ];