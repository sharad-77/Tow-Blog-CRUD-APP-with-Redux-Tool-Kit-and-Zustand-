import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../store/useBlogStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z
    .instanceof(FileList)
    .refine(list => list.length > 0, "Image is required")
    .refine(list => {
      const file = list.item(0);
      return file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024;
    }, "Invalid image or too large (max 5MB)"),
});

type BlogFormInput = z.infer<typeof BlogSchema>;

const BlogDetail: React.FC = () => {
  const { BlogId } = useParams();

  const Blog = useBlogStore((state) => state.blogs.find((blog) => blog.id === BlogId));
  const UpdateBlog = useBlogStore((state) => state.updateBlog);

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BlogFormInput>({
    resolver: zodResolver(BlogSchema)
  });

  const onSubmit = (data: BlogFormInput) => {
    const fileList = data.image;
    const file = fileList.item(0) || null;

    if (!BlogId) return alert("Blog ID not found");

    if (!file) return alert("Image not uploaded");

    const imageURL = URL.createObjectURL(file);

    const BlogPayload = {
      id: BlogId,
      title: data.title,
      description: data.description,
      image: imageURL
    }

    if (data) {
      UpdateBlog(BlogPayload);
    }

  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg">
      <div className="p-8 rounded-lg shadow-md">
        <img
          src={Blog?.image}
          alt="Blog Post"
          className="rounded-md mb-4"
        />
        <h2 className="text-4xl font-bold mb-4">{Blog?.title}</h2>
        <p className="leading-relaxed">{Blog?.description}</p>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>

        {isEditing && (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-1">Title</label>
              <input
                {...register("title")}
                type="text"
                className="w-full border p-2 rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full border p-2 rounded"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Upload Image</label>
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
