import React from "react";
import Navbar from "../component/Navbar";
import { Button } from "../components/ui/button";
import {
  PenLine,
  Users,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Home() {
    const user = useSelector((state) => state.app.user)
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          A Home for Writers, Thinkers & Creators on{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            BlogHub
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          BlogHub is a modern blogging platform designed to help you write,
          publish, and grow your audience without distractions.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-6 text-base"
          >
            <Link to={user ? "/dashboard/createBlogs" : "/login"} onClick={() => {
              if (!user) {
                toast.error("unauthorized user")
              }
            }}>Start Writing Free</Link>
          </Button>

          <Button asChild variant="outline" className="px-8 py-6 text-base">
            <Link to="/blogs">Explore Blogs</Link>
          </Button>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-y py-10">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-600 text-sm">
          <p>✨ Trusted by 10,000+ writers</p>
          <p>🚀 100K+ monthly readers</p>
          <p>🌍 Global community</p>
          <p>🔒 Secure & private</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Blog Better
          </h2>
          <p className="mt-4 text-gray-600">
            Powerful tools designed for writers of all levels.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <Feature
            icon={<PenLine />}
            title="Distraction-Free Writing"
            desc="A clean editor that helps you focus on what matters most — your words."
          />
          <Feature
            icon={<Users />}
            title="Audience Engagement"
            desc="Followers, likes, and comments to connect with your readers."
          />
          <Feature
            icon={<TrendingUp />}
            title="Analytics & Growth"
            desc="Track views, engagement, and trending posts in real-time."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Secure Accounts"
            desc="Your data is protected with modern authentication and encryption."
          />
          <Feature
            icon={<Sparkles />}
            title="Beautiful Design"
            desc="Minimal, elegant layouts that make your content shine."
          />
          <Feature
            icon={<BookOpen />}
            title="Discover Great Content"
            desc="Explore stories from creators around the world."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            How BlogHub Works
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <Step number="01" title="Create Account">
              Sign up in seconds and set up your profile.
            </Step>
            <Step number="02" title="Write Your Story">
              Use our editor to craft engaging blog posts.
            </Step>
            <Step number="03" title="Publish & Grow">
              Share your ideas and grow your audience.
            </Step>
          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What Writers Say
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Ayesha Khan"
            role="Tech Blogger"
            text="BlogHub helped me reach thousands of readers with ease. The UI is clean and professional."
          />
          <Testimonial
            name="Ali Raza"
            role="Student Writer"
            text="Perfect platform for beginners. Writing and publishing is super easy."
          />
          <Testimonial
            name="Sara Ahmed"
            role="Content Creator"
            text="I love the simplicity and focus. BlogHub feels built for writers."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Writing Journey Today
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Join BlogHub and turn your ideas into meaningful stories.
        </p>
        <Button
          asChild
          className="mt-8 bg-white text-indigo-600 font-semibold px-10 py-6"
        >
          <Link to={user ? "/dashboard/createBlogs" : "/login"} onClick={() => {
              if (!user) {
                toast.error("unauthorized user")
              }
            }}>Get Started Free</Link>
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BlogHub — Built for writers.
      </footer>
    </div>
  );
}

/* Components */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition">
      <div className="text-indigo-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
      <div className="text-indigo-500 text-3xl font-bold mb-4">{number}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{children}</p>
    </div>
  );
}

function Testimonial({ name, role, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border">
      <p className="text-gray-600">“{text}”</p>
      <div className="mt-4">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
