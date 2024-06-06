export enum statusType {
  open = "open",
  inProgress = "in progress",
  closed = "closed",
}

export type task = {
  id: string;
  title: string;
  description: string;
  status: statusType;
  createdAt: string;
};

export type taskContext = {
  allTasks: task[];
  currentTask: task | undefined;
  isCurrentTaskLoading: boolean;
  selectTask: (taskId: string) => void;
  createTask: (newTask: newTask) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (updateTask: updateTask) => void;
};

export type newTask = {
  title: string;
  description: string;
  status: statusType;
};

export type updateTask = { id: string } & newTask;

// API_RESPONSE
export type getTasksRes = {
  message: string;
  tasks: task[];
};

export type getTaskRes = {
  message: string;
  task: task;
};
