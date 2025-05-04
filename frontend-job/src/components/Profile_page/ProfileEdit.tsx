import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

const ProfileEdit = ({ userData, onSave }: { userData: any; onSave: () => void }) => {
  const [form, setForm] = useState({
    full_name: userData.full_name || "",
    phone_number: userData.phone_number || "",
    location_state: userData.location_state || "",
    location_city: userData.location_city || "",
    location_country: userData.location_country || "",
    dob: userData.dob || "",
    gender: userData.gender || "",
    skills: userData.skills ? userData.skills.split(",") : [],
    education: userData.education || "",
    experience: userData.experience || "",
    preferred_job_type: userData.preferred_job_type || "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const email = Cookies.get("user_email");

    try {
      await axios.put(
        `https://642f-114-143-151-74.ngrok-free.app/api/users/${email}/edit`,
        {
          ...form,
          skills: form.skills, // should already be array
        },
        { withCredentials: true }
      );

      setMessage("Profile updated successfully.");
      onSave(); // refresh profile view
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" />
      <Input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" />
      <Input name="location_city" value={form.location_city} onChange={handleChange} placeholder="City" />
      <Input name="location_state" value={form.location_state} onChange={handleChange} placeholder="State" />
      <Input name="location_country" value={form.location_country} onChange={handleChange} placeholder="Country" />
      <Input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" />
      <Input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
      <Input
        name="skills"
        value={form.skills.join(",")}
        onChange={(e) => setForm({ ...form, skills: e.target.value.split(",") })}
        placeholder="Skills (comma separated)"
      />
      <Input name="education" value={form.education} onChange={handleChange} placeholder="Education" />
      <Input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" />
      <Input
        name="preferred_job_type"
        value={form.preferred_job_type}
        onChange={handleChange}
        placeholder="Preferred Job Type"
      />

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>

      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default ProfileEdit;
