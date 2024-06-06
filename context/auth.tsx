import React, { createContext, useEffect, useState } from "react";
import {
  authContext,
  creds,
  getUserRes,
  newUser,
  signInRes,
} from "@/types/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getUser, signIn, signUp } from "@/api/auth";

const defaultAuthValue: authContext = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  token: undefined,
  register: () => {},
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<authContext>(defaultAuthValue);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

  const { data, isSuccess, isLoading } = useQuery<
    any,
    Error,
    getUserRes,
    string[]
  >({
    queryKey: ["user"],
    queryFn: () => getUser(token),
    enabled: token != undefined,
  });

  const registerMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      alert(data.message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSettled: (data: signInRes | undefined) => {
      alert(data?.message);
      if (data?.token) {
        Cookies.set("token", data.token);
        setToken(data.token);
      }
    },
  });

  const register = async (userData: newUser) => {
    await registerMutation.mutateAsync(userData);
    await login({ email: userData.email, password: userData.password });
  };

  const login = async (creds: creds) => {
    await loginMutation.mutateAsync(creds);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(undefined);
    queryClient.removeQueries({ queryKey: ["user"] });
  };
  useEffect(() => {
    if (!isLoading && !isSuccess) {
      logout();
    }
  }, [isSuccess]);

  if (isLoading) {
    <div>loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isSuccess && token != undefined,
        isLoading,
        token,
        user: data?.user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
