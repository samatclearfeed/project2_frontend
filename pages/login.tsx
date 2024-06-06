import React, { useContext, useEffect } from "react";
import Login from "@/components/login";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";

export default function LoginPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return <Login />;
}
