import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiContextError } from "@tourbit/utils";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";


type User = {
  name: string,
  email: string,
}

interface TourbitContextType {
  apiKey: string;
  baseUrl?: string;
  tourbitInstance: axios.AxiosInstance;
  userId?: string;
  user?: User;
}

interface ApiProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
  userId?: string;
  user?: User;
}

const TourbitContext = createContext<TourbitContextType | null>(null);

export const useApi = () => {
  const context = useContext(TourbitContext);

  if (context === null) {
    throw new ApiContextError("useApi must be used within an ApiProvider");
  }

  return context;
};

export const TourbitProvider: React.FC<ApiProviderProps> = ({
  apiKey,
  children,
  userId,
  user
}) => {
  const baseUrl = "http://localhost:5000";
  if (!apiKey) {
    throw new ApiContextError("API key is required");
  }

  if (!/^[A-Za-z0-9_-]{20,}$/.test(apiKey)) {
    throw new ApiContextError("Invalid API key format");
  }

  const tourbitInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const value = {
    apiKey,
    baseUrl,
    tourbitInstance,
    userId,
    user
  };

  const queryClient = new QueryClient();
  return (
    <TourbitContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TourbitContext.Provider>
  );
};
