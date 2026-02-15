import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

export default function Createblog() {
  const widgetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    thumbnail: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://bloggingapp-backend-dci1.vercel.app/blogs/createBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      const { success, message } = data;
      if (success) {
        toast.success(message);
        setForm({
          thumbnail: "",
          title: "",
          description: "",
        });
      }
      if (success == false) {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "difaskylg",
        uploadPreset: "Blogging-app-preset",
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          setForm((prev) => ({
            ...prev,
            thumbnail: result.info.secure_url,
          }));
          console.log("image url => ", result.info.secure_url);
        }
      },
    );
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Blog</h1>

        <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div
            className="w-full h-[300px] rounded-xl border-2 border-dashed border-gray-400 overflow-hidden relative flex items-center justify-center"
            style={{
              backgroundImage: form.thumbnail
                ? `url(${form.thumbnail})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!form.thumbnail ? (
              <>
                <p className="text-gray-500 text-sm mb-2">Upload an image</p>
                <Button onClick={() => widgetRef.current.open()} type = "button">
                  Upload Image
                </Button>
              </>
            ) : (
              <Button
                onClick={() => widgetRef.current.open()}
                type = "button"
                className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white"
              >
                Change Image
              </Button>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write your blog description..."
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Publish Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
        </form>
      </div>
    </div>
  );
}
