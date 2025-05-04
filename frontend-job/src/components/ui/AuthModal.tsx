import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import Cookies from "js-cookie";
import Select from "react-select";

type AuthModalProps = {
  type: "signup" | "login";
  open: boolean;
  onClose: () => void;
};

type OptionType = {
  label: string;
  value: string;
  cities?: string[];
};

const AuthModal: React.FC<AuthModalProps> = ({ type, open, onClose }) => {
  if (!open) return null;

  const isSignup = type === "signup";

  const [formData, setFormData] = useState({
    full_name: "",
    user_email: "",
    password: "",
    phone_number: "",
    location_state: "",
    location_city: "",
    location_country: "",
    dob: "",
    gender: "",
    skills: [] as string[],
    education: "",
    experience: "",
    preferred_job_type: "",
  });

  const [states, setStates] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://642f-114-143-151-74.ngrok-free.app/api/locations/states",
          { withCredentials: true }
        );
        setStates(
          response.data.map((state: any) => ({
            value: state.state_code,
            label: state.state_name,
            cities: state.cities,
          }))
        );
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = (selectedState: OptionType | null) => {
    setFormData((prev) => ({
      ...prev,
      location_state: selectedState?.label || "",
      location_country: "India",
    }));
    setCities(
      selectedState?.cities
        ? selectedState.cities.map((city: string) => ({
            label: city,
            value: city,
          }))
        : []
    );
    setSelectedCity(null);
  };

  const handleCityChange = (selectedCity: OptionType | null) => {
    setSelectedCity(selectedCity);
    setFormData((prev) => ({
      ...prev,
      location_city: selectedCity?.label || "",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isSignup
        ? "https://642f-114-143-151-74.ngrok-free.app/api/users/register"
        : "https://642f-114-143-151-74.ngrok-free.app/api/users/login";

      const payload = isSignup
        ? { ...formData }
        : {
            user_email: formData.user_email,
            password: formData.password,
          };

      const response = await axios.post(url, payload);

      if (response.status === 200 || response.status === 201) {
        Cookies.set("user_email", formData.user_email, { expires: 7 });
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] shadow-lg relative overflow-hidden">
        <Button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </Button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form
          className="space-y-4 overflow-y-auto pr-2"
          style={{ maxHeight: "70vh" }}
          onSubmit={handleSubmit}
        >
          {isSignup && (
            <>
              <Input
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <Input
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              <Select
                options={states}
                onChange={handleStateChange}
                placeholder="Select State"
              />
              <Select
                options={cities}
                onChange={handleCityChange}
                value={selectedCity}
                placeholder="Select City"
              />
              <Input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleInputChange}
              />
              <Input
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
              <Select
                isMulti
                name="skills"
                placeholder="Select Skills"
                options={[
                  { label: "Plumber", value: "Plumber" },
                  { label: "Electrician", value: "Electrician" },
                  { label: "Software Developer", value: "Software Developer" },
                  { label: "Mechanic", value: "Mechanic" },
                ]}
                value={formData.skills.map((skill) => ({
                  label: skill,
                  value: skill,
                }))}
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: selectedOptions.map((option) => option.value),
                  }))
                }
              />
              <Input
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleInputChange}
              />
              <Input
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
              <Input
                name="preferred_job_type"
                placeholder="Preferred Job Type"
                value={formData.preferred_job_type}
                onChange={handleInputChange}
              />
            </>
          )}

          <Input
            name="user_email"
            type="email"
            placeholder="Email"
            value={formData.user_email}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {isSignup && selectedCity && (
            <Input
              name="location_country"
              value={formData.location_country}
              placeholder="Country"
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          )}

          <Button
            type="submit"
            className="w-full text-white font-medium py-2 rounded bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Signing Up..."
                : "Logging In..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </Button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
