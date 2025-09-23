import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/userSlices'
import authReducer from '../slices/authSlice'
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer
  }
})
