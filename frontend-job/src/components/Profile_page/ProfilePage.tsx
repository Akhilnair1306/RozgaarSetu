import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileView from "./ProfileView";
// import ProfileEdit from "./ProfileEdit";
import HeroHeader from "../Home/NavBar";
import ProfileEdit from "./ProfileEdit";

const ProfilePage = () => {
  const email = Cookies.get("user_email");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError("User email not found.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://642f-114-143-151-74.ngrok-free.app/api/users/email/${email}`,
          { withCredentials: true }
        );
        setUserData(response.data.user);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const refreshUserData = () => {
    setLoading(true);
    axios
      .get(`https://642f-114-143-151-74.ngrok-free.app/api/users/email/${email}`, { withCredentials: true })
      .then((res) => setUserData(res.data.user))
      .catch(() => setError("Failed to refresh user data."))
      .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data available.</div>;

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 w-full z-10">
        <HeroHeader />
      </div>

      <div className="container mx-auto px-4 py-8 mt-10">
        <Tabs defaultValue="view" className="w-full">
          <TabsList>
            <TabsTrigger value="view">View Profile</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <ProfileView userData={userData} />
          </TabsContent>

          <TabsContent value="edit">
            <ProfileEdit userData={userData} onSave={refreshUserData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
