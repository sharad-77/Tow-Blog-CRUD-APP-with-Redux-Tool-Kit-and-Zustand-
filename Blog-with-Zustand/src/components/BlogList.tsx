import { useBlogStore } from '../store/useBlogStore';
import BlogCard from "./BlogCard";

const BlogList = () => {
  const blogs = useBlogStore((state) => state.blogs);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
