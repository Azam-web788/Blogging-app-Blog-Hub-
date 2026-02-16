import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { LoaderCircle, MoreVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react'
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Userblogs() {
  const [blogs, setBlogs] = useState([]);
  const [form , setForm] = useState({
    title : "",
    description : "",
    thumbnail : "",
  })
  const [edit ,setEdit] = useState(false)
  const [editingId , setEditingId] = useState("")
  const myWidget = useRef(null)
  const [loading , setLoading] = useState(false)
  const api = ["https://bloggingapp-backend-lpr6.vercel.app/", "/blogs/deleteBlog/", "/blogs/editBlog/"]
  async function AllBlogs() {
    try {
      const response = await fetch(
        "https://bloggingapp-backend-lpr6.vercel.app/blogs/userBlogs",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const res = await response.json();
      const { userBlogs } = res;
      setBlogs(userBlogs);
      console.log(userBlogs);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  }
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
              thumbnail: result.info.secure_url,
            }));
          }
        }
      );
    AllBlogs();
  }, []);
  async function EditBlogs(id) {
    try {
      setLoading(true)
      const response = await fetch(`${api[0]}${api[2]}${id}` ,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials : "include",
        body: JSON.stringify(form),
      })
      const res = await response.json()
      const {success , message} = res
      if (success) {
        toast.success(message)
        setEdit(false)
        setEditingId("")
        AllBlogs()
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
   async function DeleteBlogs(id) {
      try {
        const response = await fetch(`${api[0]}${api[1]}${id}` ,  {
            method: "DELETE",
            credentials: "include",
          })
          const res = await response.json()
          const {message , success} =  res
          if (success) {
            toast.success(message)
            AllBlogs()
          }
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">User Blogs</h1>

      <div className="flex items-center flex-row flex-wrap gap-4">
        {blogs &&
          blogs.map((items) => {
            return (
              <div
                key={items._id}
                className="w-full max-w-xl bg-white rounded-xl shadow-md overflow-hidden relative"
              >
                {/* Three Dots Dropdown */}
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-gray-200">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingId(items._id)
                          setForm({
      title: items.title,
      description: items.description,
      thumbnail: items.thumbnail,
    });
    setEdit(true)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => DeleteBlogs(items._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 p-4">
                  <img
                    src={items.image}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h2 className="font-semibold text-sm">{items.name}</h2>
                </div>

                <div className="px-4 pb-4">
  {editingId === items._id && edit ? (
    <>
      <input
        className="w-full border p-2 rounded mb-2"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
    </>
  ) : (
    <>
      <h3 className="font-semibold text-base mb-1">
        {items.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {items.description}
      </p>
    </>
  )}
</div>

    <div className="w-full h-[300px] p-2">
  {editingId === items._id && edit ? (
    <button className="w-full h-full border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500" onClick={() => myWidget.current.open()}>
      {form.thumbnail && edit ? (
        <img
          src={form.thumbnail}
          alt="preview"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        "Upload Image"
      )}
    </button>
  ) : (
    <img
      src={items.thumbnail}
      alt="blog"
      className="w-full h-full object-cover"
    />
  )}
</div>
{editingId === items._id && edit && (
<div className="px-4 pb-4">
    <div className="flex gap-4 mt-4">
      <Button
        variant="outline"
        className="w-1/2 h-12 text-base"
        onClick={() => {
          setEdit(false);
          setEditingId("");
        }}
      >
        Clear
      </Button>

      <Button
        className="w-1/2 h-12 text-base bg-purple-900 hover:bg-purple-700"
        disabled = {loading}
        onClick={() => EditBlogs(items._id)}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
      </Button>
    </div>
  </div>
)}
      
              </div>
            );
          })}
      </div>
    </div>
  );
}
