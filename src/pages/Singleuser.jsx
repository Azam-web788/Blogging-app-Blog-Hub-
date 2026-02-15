import Navbar from "../component/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Singleuser() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const api = ["https://bloggingapp-backend-dci1.vercel.app/", "user/singleuser/"];

  async function UserwithBlogs() {
    try {
      setLoading(true);
      const response = await fetch(`${api[0]}${api[1]}${id}`);
      const res = await response.json();
      setUser(res.user);
      setBlogs(res.blog);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    UserwithBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <br /><br />

      {loading && (
        <div className="w-full flex justify-center items-center py-10">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      )}

      {!loading && (
        <>
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
            <img
              src={user?.image}
              alt="user"
              className="w-36 h-36 rounded-full object-cover border"
            />

            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold">
                {user?.firstname} {user?.lastname}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">{user?.phonenumber}</p>
              <p>{user?.role}</p>
              <div className="flex gap-4 justify-center md:justify-start mt-2">
                <a href={user?.instagramUrl} target="_blank" className="text-pink-600 font-semibold">
                  Instagram
                </a>
                <a href={user?.linkedinUrl} target="_blank" className="text-blue-700 font-semibold">
                  LinkedIn
                </a>
              </div>
              <p>{user?.about}</p>
            </div>
          </div>

          {/* BLOGS SECTION */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">User Blogs</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h4 className="text-lg font-bold">{blog.title}</h4>
                    <p className="text-gray-600 mt-2">{blog.description}</p>

                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}