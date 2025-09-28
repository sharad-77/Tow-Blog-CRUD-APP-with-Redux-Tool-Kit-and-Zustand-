import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store/store";

type Blog = {
  id: string,
  title: string,
  description: string,
  image: string
}

type BlogState = {
  blogs: Blog[];
}

const initialState:BlogState = {
  blogs: [],
}

type CreateBlogInput = Omit<Blog, "id">;

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog: (state, action: PayloadAction<CreateBlogInput>) => {
      const newBlog = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        image: action.payload.image
      };
      state.blogs.push(newBlog);
    },
    updateBlog: (state, action: PayloadAction<Blog>) => {
      const { id, title, description, image } = action.payload;
      const existingBlog = state.blogs.find((blog) => blog.id === id);
      if (existingBlog) {
        if (title !== undefined) {
          existingBlog.title = title;
        }
        if (description !== undefined) {
          existingBlog.description = description;
        }
        if (image !== undefined) {
          existingBlog.image = image;
        }
      }
    }
  }
})

export const selectBlogs = (state:RootState) => state.blogs.blogs;
export const selectBlogById = (state:RootState, blogId:string) => state.blogs.blogs.find(blog => blog.id === blogId)
export const { createBlog, updateBlog } = blogSlice.actions;

export default blogSlice.reducer;
