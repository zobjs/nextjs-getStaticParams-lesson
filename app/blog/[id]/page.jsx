// app/blog/[id]/page.js

import React from 'react';

const fetchBlogById = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

export default async function BlogDetail({ params }) {
  const { id } = params;
  const { blog } = await fetchBlogById(id);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>
        <p className="text-sm text-gray-500 mt-2">By {blog.author}</p>
        <span className="inline-block mt-4 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
          {blog.category}
        </span>
        <p className="mt-4 text-gray-700">{blog.content}</p>
        <div className="mt-4">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
