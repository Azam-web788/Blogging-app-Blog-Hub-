import React, { useEffect, useRef, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Camera, LoaderCircle, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const myWidget = useRef(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    image: "",
    instagramUrl: "",
    about: "",
    role: "",
    linkedinUrl: "",
  });
  const inputClass =
    "w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(form);
  useEffect(() => {
    myWidget.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "difaskylg",
        uploadPreset: "Blogging-app-preset",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setForm((prev) => ({
            ...prev,
            image: result.info.secure_url,
          }));
        }
      },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://bloggingapp-backend-lpr6.vercel.app/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      const { success, message, user } = data;
      if (success) {
        toast.success(message);
        setForm({
          image: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          about: "",
          role: "",
          phonenumber: "",
          linkedinUrl: "",
          instagramUrl: "",
        });
        console.log(user);
        navigate("/login");
      }
      if (success == false) {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-12 lg:px-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white">
        <h1 className="text-5xl font-bold">Welcome to BlogHub</h1>
        <p className="mt-6 text-lg text-white/90 max-w-md">
          A modern blogging platform built for creators and professionals.
        </p>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-8 bg-white">
        <div className="w-full max-w-md py-12">
          <h1 className="md:hidden text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BlogHub
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800 text-center md:text-left">
            Create Account
          </h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div
                className="relative group cursor-pointer"
                onClick={() => myWidget.current.open()}
              >
                <div className="w-28 h-28 rounded-full border-2 border-indigo-600 flex items-center justify-center bg-indigo-50 overflow-hidden">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-indigo-600" />
                  )}
                </div>

                <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-xs text-white mt-1">Upload</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 space-y-1">
                <Label>First Name</Label>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputClass}
                />
              </div>

              <div className="w-1/2 space-y-1">
                <Label>Last Name</Label>
                <input
                  name="lastname"
                  type="text"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <input
                name="password"
                type="password"
                value={form.password}
                placeholder="••••••••"
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <input
                type="text"
                name="role"
                placeholder="e.g. Blogger, Developer"
                value={form.role}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <Label>About</Label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Tell us something about yourself..."
                rows={4}
                cols={40}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label>Phone Number</Label>
              <input
                type="tel"
                name="phonenumber"
                placeholder="0345678910"
                value={form.phonenumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <Label>Instagram URL</Label>
              <input
                type="text"
                name="instagramUrl"
                placeholder="Enter your Instagram url"
                value={form.instagramUrl}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <Label>LinkedIn URL</Label>
              <input
                type="text"
                name="linkedinUrl"
                placeholder="Enter your Linkedin url"
                value={form.linkedinUrl}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={loading ? "w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 cursor-not-allowed" : "w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
