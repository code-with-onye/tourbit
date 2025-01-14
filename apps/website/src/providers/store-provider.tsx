"use client";

import { createContext, ReactNode, useRef } from "react";
import { createUserStore } from "@/store/userStore";

interface StoreProviderProps {
  children: ReactNode;
}

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<UserStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {typeof window !== "undefined" ? children : null}
    </UserStoreContext.Provider>
  );
}
