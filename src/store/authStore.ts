import { create } from "zustand";
import type { User } from "firebase/auth";
import { authStateListener } from "../services/auth";

// TYPES
interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
}));

// INIT LISTENER
export const initAuthListener = () => {
  authStateListener((user) => {
    useAuthStore.getState().setUser(user);
  });
};
