import { OrbitProgress } from "react-loading-indicators";
import Navbar from "../component/Navbar";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    async function GetData() {
      try {
        setLoading(true);
        const response = await fetch("https://bloggingapp-backend-lpr6.vercel.app/blogs/allBlogs");
        const res = await response.json();
        setBlogs(res.allBlogs);
      } catch (err) {
        alert("server error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    GetData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center flex-col gap-7">
        {loading && (
          <div className="w-full flex justify-center py-10">
            <OrbitProgress variant="track-disc" color="#32cd32" />
          </div>
        )}

        {blogs.map((items) => (
          <div
            className="w-full max-w-xl bg-white rounded-xl shadow-md overflow-hidden"
            key={items._id}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 p-4">
              <img
                src={items.image}
                alt="user"
                className="w-12 h-12 rounded-full object-cover"
              />
              <h2
                className="font-semibold text-sm cursor-pointer hover:underline transition-all duration-150"
                onClick={() => {
                  if (user) {
                    navigate(`/view/${items.userid}`);
                  } else {
                    toast.error("Please login to view user profile");
                  }
                }}
              >
                {items.name}
              </h2>
            </div>

            {/* Title & Description */}
            <div className="px-4 pb-4">
              <h3 className="font-semibold text-base mb-1">{items.title}</h3>
              <p className="text-sm text-gray-600">
                {items.description.slice(0, 80)}...
              </p>
            </div>

            {/* Thumbnail Click */}
            <div
              className="w-full h-[300px] cursor-pointer"
              onClick={() => {
                setSelectedBlog(items);
                setOpenModal(true);
              }}
            >
              <img
                src={items.thumbnail}
                alt="blog"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && selectedBlog && (
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
          {/* Modal Box */}
          <div
            className="
              w-full h-full 
              md:h-auto md:w-[95%] md:max-w-3xl 
              bg-black text-white 
              md:bg-white md:text-black 
              overflow-y-auto relative
            "
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white md:text-black text-2xl font-bold"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            {/* Full Image */}
            <div className="w-full h-[70vh] md:h-[500px]">
              <img
                src={selectedBlog.thumbnail}
                alt="blog"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={selectedBlog.image}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h2 className="font-semibold text-lg">{selectedBlog.name}</h2>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold mb-2 text-white md:text-black">
                {selectedBlog.title}
              </h1>

              {/* Description */}
              <p className="leading-relaxed text-gray-300 md:text-gray-700">
                {selectedBlog.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
