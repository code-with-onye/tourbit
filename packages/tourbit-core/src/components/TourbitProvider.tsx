import { ApiContextError } from "@tourbit/utils";
import { createContext, ReactNode, useContext } from "react";

interface TourbitContextType {
  apiKey: string;
  baseUrl?: string;
}

interface ApiProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
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
  baseUrl = "https://api.default.com",
  children,
}) => {
  if (!apiKey) {
    throw new ApiContextError("API key is required");
  }

  if (!/^[A-Za-z0-9_-]{20,}$/.test(apiKey)) {
    throw new ApiContextError("Invalid API key format");
  }

  const value = {
    apiKey,
    baseUrl,
  };

  return (
    <TourbitContext.Provider value={value}>{children}</TourbitContext.Provider>
  );
};
