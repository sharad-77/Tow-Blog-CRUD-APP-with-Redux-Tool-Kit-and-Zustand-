import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UserState = {
  users: User[];
}

const initialState: UserState = {
  users: [{
    id:"sadfasdfasdfasdfasdf",
    name: "Sharad",
    email: "chavdasharad54@gmail.com",
    password:"123456"
  },],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
  addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newUser = {
        id: nanoid(),
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
      state.users.push(newUser);
    }
  }
})

export const selectUsers = (state: RootState) => state.users.users;

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
