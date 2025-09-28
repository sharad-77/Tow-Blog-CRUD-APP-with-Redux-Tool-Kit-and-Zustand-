import React from 'react'
import { useNavigate } from 'react-router-dom';

export type BlogCardProps = {
  id:string,
  title: string,
  description: string,
  image:string
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, description, image }) => {
  const navigate = useNavigate();
  return (
    <div className="border-1 p-6 bg-white text-black rounded-lg shadow-md">
          <img src={image} alt="Blog Post" className="rounded-md mb-4"/>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="mb-4">{description}</p>
      <button
        onClick={() => {
          navigate(`/blog/${id}`)
        }}
        className="text-blue-500 hover:underline">Read More
          </button>
        </div>
  )
}

export default BlogCard
