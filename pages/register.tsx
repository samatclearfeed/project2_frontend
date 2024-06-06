import React, { useContext, useEffect } from "react";
import Register from "@/components/register";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";

export default function RegisterPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return <Register />;
}
