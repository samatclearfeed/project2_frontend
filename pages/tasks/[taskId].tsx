import { useRouter } from "next/router";
import Task from "@/components/task";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth";

export default function TaskPage() {
  const router = useRouter();
  const { taskId } = router.query;

  const { isAuthenticated, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return <Task taskId={taskId ? taskId.toString() : ""} />;
}
