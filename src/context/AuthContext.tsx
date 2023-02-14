import { UseMutationResult, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { api } from "../api";

type User = {
  _id?: string;
  name?: string;
  email: string;
  phone?: number;
  password: string;
};

type AuthContext = {
  user?: User;
  register: UseMutationResult<{ message: string }, unknown, User>;
  login: UseMutationResult<{ message: string; user: User }, unknown, User>;
  logout: () => void;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>("user");

  const register = useMutation({
    mutationFn: async (user: User) => {
      const { data } = await api.post("/register", user);
      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },

    onError: (error: AxiosError) => {
      toast.error(String(error.response.data));
    },
  });

  const login = useMutation({
    mutationFn: async (user: User) => {
      const { data } = await api.post("/login", user);
      return data as { message: string; user: User };
    },

    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
      navigate("/");
    },

    onError: (error: AxiosError) => {
      toast.error(String(error.response.data));
    },
  });

  const logout = () => {
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Context.Provider value={{ register, login, logout, user }}>
      {children}
    </Context.Provider>
  );
}
