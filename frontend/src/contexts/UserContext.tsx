import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserData } from "../types/types";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
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

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
