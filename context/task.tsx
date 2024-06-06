import {
  deleteTask as dropTask,
  getTask,
  getTasks,
  patchTask,
  postTask,
} from "@/api/task";
import {
  getTaskRes,
  getTasksRes,
  newTask,
  taskContext,
  updateTask,
} from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";

const defaultTaskValue: taskContext = {
  allTasks: [],
  currentTask: undefined,
  isCurrentTaskLoading: false,
  selectTask: () => {},
  createTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
};

export const TaskContext = createContext<taskContext>(defaultTaskValue);

export const TaskProvider: React.FC<any> = ({ children }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useContext(AuthContext);

  const [currentTaskId, setCurrentTaskId] = useState<string>("");

  const { data: allTasks } = useQuery<any, Error, getTasksRes, string[]>({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: isAuthenticated,
  });

  const { data: currentTaskData, isLoading: isCurrentTaskLoading } = useQuery<
    any,
    Error,
    getTaskRes,
    string[]
  >({
    queryKey: ["task", currentTaskId],
    queryFn: () => getTask(currentTaskId),
    enabled: isAuthenticated && currentTaskId !== "",
  });

  const createTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: (data) => {
      alert(data.message);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: dropTask,
    onSuccess: (data) => {
      alert(data.message);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: patchTask,
    onSuccess: (data) => {
      alert(data.message);
    },
  });

  const selectTask = (taskId: string) => {
    queryClient.removeQueries({
      queryKey: ["task", currentTaskId],
    });
    setCurrentTaskId(taskId);
  };

  const createTask = async (newTask: newTask) => {
    await createTaskMutation.mutateAsync(newTask);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const updateTask = async (updateTask: updateTask) => {
    await updateTaskMutation.mutateAsync(updateTask);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    await queryClient.invalidateQueries({ queryKey: ["task", updateTask.id] });
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <TaskContext.Provider
      value={{
        allTasks: allTasks?.tasks ? allTasks?.tasks : [],
        currentTask: currentTaskData?.task,
        isCurrentTaskLoading: isCurrentTaskLoading,
        selectTask,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
