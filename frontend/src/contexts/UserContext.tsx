import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserData } from "../types/types";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  updateUserScore: (newScore: number) => void;
  refreshTrigger: number;
  triggerToplistRefresh: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

export function UserProvider({
  children,
  initialUserData,
}: {
  children: ReactNode;
  initialUserData: UserData;
}) {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const updateUserScore = (newScore: number) => {
    setUserData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, score: newScore };
    });
  };

  const triggerToplistRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserScore, refreshTrigger, triggerToplistRefresh }}>
      {children}
    </UserContext.Provider>
  );
}