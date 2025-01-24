// app/blog/page.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="text-lg font-bold mt-4">{blog.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{blog.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
