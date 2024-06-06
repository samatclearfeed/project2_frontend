import TaskList from "@/components/taskList";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

export default function TaskListPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return <TaskList />;
}
