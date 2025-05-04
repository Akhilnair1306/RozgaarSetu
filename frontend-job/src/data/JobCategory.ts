export interface JobCategory {
    id: string;
    title: string;
    icon: string;
    count: number;
    color: string;
  }
  
  export const jobCategories: JobCategory[] = [
    {
      id: "plumber",
      title: "Plumber",
      icon: "🔧",
      count: 342,
      color: "bg-blue-500",
    },
    {
      id: "electrician",
      title: "Electrician",
      icon: "⚡",
      count: 256,
      color: "bg-yellow-500",
    },
    {
      id: "carpenter",
      title: "Carpenter",
      icon: "🔨",
      count: 189,
      color: "bg-orange-500",
    },
    {
      id: "painter",
      title: "Painter",
      icon: "🖌️",
      count: 201,
      color: "bg-purple-500",
    },
    {
      id: "driver",
      title: "Driver",
      icon: "🚗",
      count: 278,
      color: "bg-green-500",
    },
    {
      id: "security",
      title: "Security Guard",
      icon: "🛡️",
      count: 165,
      color: "bg-red-500",
    },
    {
      id: "cook",
      title: "Cook",
      icon: "👨‍🍳",
      count: 147,
      color: "bg-teal-500",
    },
    {
      id: "cleaner",
      title: "Cleaner",
      icon: "🧹",
      count: 223,
      color: "bg-pink-500",
    },
  ];