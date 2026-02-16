import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { Camera, Mail, Phone, Linkedin, Instagram, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import toast from "react-hot-toast";
import { auth } from "../redux/userSlice.js";
import { persistor } from "../redux/store";

export default function Profile() {
  const [loading , setloading] = useState(false)
  const user = useSelector(state => state.app.user)
  const dispatch = useDispatch()
  const [form , setForm] = useState({
    firstname : user.firstname || "",
    lastname : user.lastname || "",
    email : user.email || "",
    about : user.about || "",
    phonenumber : user.phonenumber || "",
    role : user.role || "",
    instagramUrl : user.instagramUrl || "",
    linkedinUrl : user.linkedinUrl || ""
  })
   useEffect(() => {
  if (user) {
    setForm({
      firstname : user.firstname || "",
      lastname : user.lastname || "",
      email : user.email || "",
      about : user.about || "",
      phonenumber : user.phonenumber || "",
      role : user.role || "",
      instagramUrl : user.instagramUrl || "",
      linkedinUrl : user.linkedinUrl || ""
    });
  }
}, [user]);
    const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};
  const EditProfile = async (event, id) => {
  event.preventDefault();
  try {
    setloading(true);

    const response = await fetch(
      `https://bloggingapp-backend-lpr6.vercel.app/user/edituser/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const res = await response.json();
    const { user ,  message, success } = res;

    if (success) {
      toast.success(message);
      dispatch(auth(user)); 
    }
  } catch (error) {
    toast.error("Server error");
    console.log(error);
  } finally {
    setloading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-10 px-4">
      
      {/* Profile Header */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        
        {/* Cover */}
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <img
                src={user.image}
                alt="author"
                className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800"
              />
              <button className="absolute bottom-1 right-1 bg-black/70 p-1.5 rounded-full text-white">
                <Camera size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-16 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {user.role}
              </p>
            </div>

            <Dialog>
  <DialogTrigger asChild>
    <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
      Edit Profile
    </button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Update your personal information here.
      </DialogDescription>
    </DialogHeader>

    {/* Form */}
    <form onSubmit={(e) => EditProfile(e , user._id)}>
  <div className="grid gap-4 py-4">
    <Input name="firstname" value={form.firstname} onChange={handleChange} placeholder="First Name" />
    <Input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" />
    <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
    <Input name="phonenumber" value={form.phonenumber} onChange={handleChange} placeholder="Phone Number" />
    <Input name="role" value={form.role} onChange={handleChange} placeholder="Role" />

    <Textarea
      name="about"
      value={form.about}
      onChange={handleChange}
      placeholder="Tell us something about yourself..."
      rows={4}
    />

    <Input name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} placeholder="LinkedIn URL" />
    <Input name="instagramUrl" value={form.instagramUrl} onChange={handleChange} placeholder="Instagram URL" />
  </div>

  <DialogFooter>
    <Button type="submit" disabled = {loading}>
      {loading ? <LoaderCircle className="animate-spin" /> : "Save Changes"}
    </Button>
  </DialogFooter>
</form>

  </DialogContent>
</Dialog>

          </div>

          {/* Email + Social Links */}
<div className="mt-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
    
    {/* Email */}
    <div className="flex items-center gap-3">
      <Mail className="text-indigo-600 dark:text-indigo-400" size={18} />
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
        <p className="font-semibold text-slate-900 dark:text-white">
          {user.email}
        </p>
      </div>
    </div>

    {/* Social Links */}
    <div className="flex items-center gap-4">
      <a
        href={user.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-600 dark:text-slate-300 hover:text-indigo-600"
      >
        <Linkedin size={20} />
      </a>

      <a
        href={user.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-600 dark:text-slate-300 hover:text-pink-500"
      >
        <Instagram size={20} />
      </a>
    </div>

  </div>
</div>


        </div>
      </div>

      {/* Bio + Blogs */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bio */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow space-y-4">
          <div>
            <h2 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
              About
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {user.about}
            </p>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-3 pt-2">
            <Phone className="text-indigo-600 dark:text-indigo-400" size={18} />
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
              {user.phonenumber}
            </span>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
            Recent Blogs
          </h2>

          <ul className="space-y-4">
            <BlogItem title="Mastering React Hooks in 2025" views="2.1K" />
            <BlogItem title="Redux Toolkit Best Practices" views="1.8K" />
            <BlogItem title="TailwindCSS Tips for Clean UI" views="1.2K" />
          </ul>
        </div>

      </div>
    </div>
  );
}

function BlogItem({ title, views }) {
  return (
    <li className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
      <p className="font-medium text-slate-800 dark:text-white">
        {title}
      </p>
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {views} views
      </span>
    </li>
  );
}
