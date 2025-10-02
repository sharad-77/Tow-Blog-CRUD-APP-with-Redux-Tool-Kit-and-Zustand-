import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useBlogStore } from '../store/useBlogStore';

const BlogSchema = z.object({
  title: z.string().min(1, "Title Can't Be Empty"),
  description: z.string().min(1, "Description Can't Be Empty"),
  image: z
    .instanceof(FileList)
    .refine(list => list.length > 0, "Image is required")
    .refine(list => {
      const file = list.item(0);
      return file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024;
    }, "Invalid image or too large (max 5MB)"),
});

type BlogInput = z.infer<typeof BlogSchema>;

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const addBlog = useBlogStore((state) => state.addBlog);
  const { register, handleSubmit, formState: { errors } } = useForm<BlogInput>({
    resolver: zodResolver(BlogSchema),
  });

  const onSubmit = (data: BlogInput) => {
    const FileList = data.image;
    const file = FileList.item(0);

    if (!file) return console.log("No File selected");

    const imageURL = URL.createObjectURL(file);

    if (!data) {
      console.log("Some Thig Went Wrong");
    } else {
      navigate("/");
      addBlog(data.title, data.description, imageURL);
      console.log(useBlogStore.getState().blogs);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create a New Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='border-1 p-5 rounded-xl'>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Blog Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Blog Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              {...register("image")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="image/*"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
