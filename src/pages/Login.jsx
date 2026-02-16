import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { LoaderCircle, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { auth } from "../redux/userSlice";

export default function Login() {
  const [loading , setLoading] = useState(false)
  const [form , setForm] = useState({
    email : "",
    password : ""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await fetch("https://bloggingapp-backend-lpr6.vercel.app/user/login" ,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials : "include",
        body: JSON.stringify(form),
      })
      const res = await response.json()
      const {success , message , user} = res
      if (success) {
        toast.success(message)
        dispatch(auth(user))
        localStorage.setItem("token" , res.token)
        navigate("/")
        console.log(user);
      }
      if (success == false) {
        toast.error(message)
      }
    } catch (error) {
      alert("server error")
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  const handleChange = function (e) {
    setForm({...form , [e.target.name] : e.target.value})
  }
  console.log(form);
  
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE – Branding (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-center px-12 lg:px-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white">
        <h1 className="text-5xl font-bold leading-tight">
          Welcome Back
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-md">
          Login to continue exploring BlogHub with full access to your account.
        </p>

        <div className="mt-12 space-y-4 text-sm">
          <p>✔ Secure authentication</p>
          <p>✔ Fast & reliable access</p>
          <p>✔ Trusted by professionals</p>
        </div>
      </div>

      {/* RIGHT SIDE – Login Form */}
      <div className="flex items-center justify-center px-4 sm:px-8 bg-white">
        <div className="w-full max-w-md py-12">

          {/* Mobile Logo */}
          <h1 className="md:hidden text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BlogHub
          </h1>

          <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-800 text-center md:text-left">
            Login
          </h2>

          <p className="mt-2 text-gray-500 text-sm text-center md:text-left">
            Enter your credentials to continue
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                name = "email"
                value = {form.email}
                onChange = {handleChange}
                placeholder="you@gmail.com"
                className="h-11"
                />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name = "password"
                value = {form.password}
                onChange = {handleChange}
                placeholder="••••••••"
                className="h-11"
              />
            </div>

            <Button className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 cursor-pointer" type ="submit" disabled = {loading}>
              {loading ? <LoaderCircle className = "animate-spin" /> : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
