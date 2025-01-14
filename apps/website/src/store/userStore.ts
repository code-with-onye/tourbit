import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

// import { SignUserSchema } from "@/schema/user";

type User = {
  access_token: string;
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

interface UserActions {
  login: (userData: User) => void;
  logout: () => void;
  getUser: () => User | null;
  updateUser: (updates: Partial<User>) => void;
}

//storage implementation
const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    Cookies.set(name, value, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    Cookies.remove(name);
  },
};

// Create store with proper middleware composition
export const createUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        login: (userData) => {
          set({ user: userData, isAuthenticated: true });
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
        },
        getUser: () => get().user,
        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => cookieStorage),
        // Only persist essential data
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

// Selector hooks for optimized renders
export const useUser = () => createUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  createUserStore((state) => state.isAuthenticated);
export const useUserActions = () =>
  createUserStore((state) => ({
    login: state.login,
    logout: state.logout,
    updateUser: state.updateUser,
  }));
