import Navbar from "../component/Navbar";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Platform</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          A modern blogging space where creativity meets technology. 
          Share ideas, explore knowledge, and connect with people.
        </p>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-5 py-12 space-y-14">

        {/* INTRO */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            We are a digital blogging platform designed to give everyone 
            a voice. Whether you are a student, developer, writer, or 
            entrepreneur — this platform helps you publish and explore 
            content effortlessly with a clean and fast interface.
          </p>
        </section>

        {/* FEATURES */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Core Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <h3 className="font-semibold text-lg mb-2">Easy Publishing</h3>
              <p className="text-gray-600">
                Create and upload blogs with images in seconds using a 
                simple and user-friendly interface.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <h3 className="font-semibold text-lg mb-2">User Profiles</h3>
              <p className="text-gray-600">
                Every user has a personalized profile to showcase their 
                content and identity.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <h3 className="font-semibold text-lg mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Smooth experience on mobile, tablet, and desktop with 
                optimized layouts.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION / VISION */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower individuals to express their knowledge and ideas 
              without technical barriers and build a strong community of 
              creators.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become a go-to platform for digital storytelling and 
              meaningful online interaction worldwide.
            </p>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Technology Stack</h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">React</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">Node.js</span>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">MongoDB</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">Tailwind CSS</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">Redux</span>
          </div>
        </section>

      </div>

      {/* FOOTER NOTE */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm">
        © {new Date().getFullYear()} Blogging Platform — Built with passion & creativity.
      </footer>
    </div>
  );
}