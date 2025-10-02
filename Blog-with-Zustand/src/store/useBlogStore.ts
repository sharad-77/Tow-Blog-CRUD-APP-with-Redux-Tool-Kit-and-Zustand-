import { create } from "zustand";
import { nanoid } from 'nanoid';

export type BlogType = {
  id: string;
  title: string;
  description: string;
  image: string;
}

type UpdateBlogPayload = {
  id: string;
  title: string;
  description: string;
  image: string;
}

type BlogState = {
  blogs: BlogType[];
  addBlog: (title: string, description: string, image: string) => void;
  updateBlog: (payload: UpdateBlogPayload) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],

  addBlog: (title, description, image) => {
    const newBlog: BlogType = { id: nanoid(), title, description, image };
    set((state) => ({ blogs: [...state.blogs, newBlog] }));
  },

  updateBlog: (payload) => {
  set((state) => ({
    blogs: state.blogs.map(blog =>
      blog.id === payload.id
        ? { ...blog, title: payload.title, description: payload.description, image: payload.image }
        : blog
    )
  }));
}
}))
