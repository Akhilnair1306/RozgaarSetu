import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Code, MapPin, Phone, School, User, Calendar } from "lucide-react";

interface ProfileViewProps {
    userData: {
        full_name: string;
        user_email: string;
        phone_number: string;
        dob: string;
        gender: string;
        skills: string[];
        education: string;
        experience: string;
        preferred_job_type: string;
        location_city: string;
        location_state: string;
        location_country: string;
    }
}

const ProfileView = ({ userData }: ProfileViewProps) => {
    // Format date to be more readable
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <User className="mr-2 h-5 w-5 text-blue-600" />
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{userData.full_name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{userData.user_email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{userData.phone_number}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium">{formatDate(userData.dob)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium capitalize">{userData.gender}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Skills & Education */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <School className="mr-2 h-5 w-5 text-blue-600" />
                        Skills & Education
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Skills</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {/* {Array.isArray(userData?.skills) &&
                                    userData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))} */}
                                    {userData.skills}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-medium">{userData.education}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium">{userData.experience}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Job Preferences */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                        Job Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div className="space-y-1">
                            <p className="text-sm text-gray-500">Preferred Job Type</p>
                            <p className="font-medium capitalize">{userData.preferred_job_type}</p>
                        </div> */}
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                                {[userData.location_city, userData.location_state, userData.location_country]
                                    .filter(Boolean)
                                    .join(', ')}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileView;