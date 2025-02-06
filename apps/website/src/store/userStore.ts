// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Cookies from "js-cookie";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type AuthError = {
  message: string;
  code: string;
};

export const SignUserSchema = z.object({
  access_token: z.string(),
  firstname: z.string(),
  laststname: z.string(),
  email: z.string(),
});

type User = z.infer<typeof SignUserSchema>;

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;

  getUser: () => User | null;

  clearError: () => void;
  setError: (error: AuthError) => void;
}

const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return Cookies.get(name) || null;
    } catch (error) {
      console.error("Error reading cookie:", error);
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      Cookies.set(name, value, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    try {
      Cookies.remove(name, { path: "/" });
    } catch (error) {
      console.error("Error removing cookie:", error);
    }
  },
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            // Add timestamp for last login
            const updatedUser = {
              ...userData,
              lastLogin: new Date(),
            };

            set({
              user: updatedUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: {
                message: "Login failed",
                code: "AUTH_ERROR",
              },
              isLoading: false,
            });
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: {
                message: "Logout failed",
                code: "LOGOUT_ERROR",
              },
              isLoading: false,
            });
          }
        },

        updateUser: async (updates) => {
          set({ isLoading: true });
          try {
            const currentUser = get().user;
            if (!currentUser) throw new Error("No user found");

            const updatedUser = {
              ...currentUser,
              ...updates,
            };

            // Validate the updated user data
            SignUserSchema.parse(updatedUser);

            set({
              user: updatedUser,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: {
                message: "Update failed",
                code: "UPDATE_ERROR",
              },
              isLoading: false,
            });
          }
        },

        // Computed values
        // isAdmin: () => {
        //   const user = get().user;
        //   return user?.role === "admin";
        // },

        getUser: () => get().user,

        // Error handling
        clearError: () => set({ error: null }),
        setError: (error) => set({ error }),
      }),
      {
        name: "tourbit-user-storage",
        storage: createJSONStorage(() => cookieStorage),
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "UserStore" }
  )
);

// Optional: Export a hook for reactive authentication status
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);

// Optional: Export a hook for reactive admin status
// export const useIsAdmin = () => useUserStore((state) => state.isAdmin());
