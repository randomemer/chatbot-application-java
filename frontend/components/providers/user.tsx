"use client";

import api, { fetcher } from "@/lib/api";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

export interface UserContextValue {
  user: Optional<User>;
  fetchUser: () => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  fetchUser: () => {},
  logout: () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export default function UserProvider(props: PropsWithChildren) {
  const { data, mutate } = useSWR<User>("/auth/me", { fetcher });
  const [user, setUser] = useState<Optional<User>>(null);

  const router = useRouter();

  useEffect(() => {
    console.log("fetched user", data);
    setUser(data ?? null);
  }, [data]);

  const fetchUser = () => mutate();

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
