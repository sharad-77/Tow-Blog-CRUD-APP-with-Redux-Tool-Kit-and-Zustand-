import { nanoid } from 'nanoid';
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  signup: (user: Omit<User, "id">) => boolean;
  login: (creds: LoginData) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  users: [
    {
      id: "Ng3rD5xeS84PeroAH_XfG",
      name: "Keval Bhutiya",
      email: "chavdasharad54@gmail.com",
      password: "123456"
    },
  ],
  currentUser: null,
  isAuthenticated: false,

  signup: (newUser) => {
    const id = nanoid();
    const user = { id, ...newUser };
    set((state) => ({
      users: [...state.users, user],
      currentUser: user,
      isAuthenticated: true,
    }));
    return true;
  },

  login: ({ email, password }) => {
    const user = get().users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return false;

    set({ currentUser: user, isAuthenticated: true });
    return true;
  },

  logout: () => set({ currentUser: null, isAuthenticated: false }),
}));
