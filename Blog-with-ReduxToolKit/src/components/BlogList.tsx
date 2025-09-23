import { Link } from 'react-router-dom';

const BlogList = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample Blog Post */}
        <div className="border-1 p-6 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/400x200" alt="Blog Post" className="rounded-md mb-4"/>
          <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
          <p className="mb-4">This is a short description of the blog post.</p>
          <Link to="/blog/1" className="text-blue-500 hover:underline">Read More</Link>
        </div>
        {/* Repeat for other blog posts */}
      </div>
    </div>
  );
};

export default BlogList;
