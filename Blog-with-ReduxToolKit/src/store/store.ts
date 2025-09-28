import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/userSlices';
import authReducer from '../slices/authSlice';
import blogReducer from '../slices/blogSlice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    blogs: blogReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
