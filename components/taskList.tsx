import { TaskContext } from "@/context/task";
import { statusType, task } from "@/types/task";
import Link from "next/link";
import NavBar from "./navBar";
import React, { useContext, useState } from "react";
import { getTimeDifference } from "./helper";
import classes from "@/styles/task.module.css";
import { MdLibraryBooks, MdDelete } from "react-icons/md";

type TaskItemProps = {
  task: task;
  onDeleteClick: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteClick }) => {
  const handleDeleteTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    onDeleteClick(task.id);
  };

  const statusColor = {
    closed: "green",
    open: "#0B60B0",
    "in progress": "red",
  };

  return (
    <Link
      href={`/tasks/${task.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={classes.taskContent}>
        <div className={classes.taskTitle}>
          <h4>{task.title}</h4>
          <button onClick={handleDeleteTask}>
            {" "}
            <MdDelete /> Delete{" "}
          </button>
        </div>
        <p className={classes.taskDescription}>{task.description}</p>
        <div className={classes.taskInfo}>
          <p style={{ color: statusColor[task.status] }}>
            status: {task.status}
          </p>
          <p style={{ fontWeight: "600", color: "grey" }}>
            created {`${getTimeDifference(task.createdAt)} hrs ago`}
          </p>
        </div>
      </div>
    </Link>
  );
};

const TaskList = () => {
  const { createTask, allTasks, deleteTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      alert("title and description should not be empty!");
      return;
    }

    createTask({ title, description, status: statusType.open });

    setShowModal(false);
  };

  return (
    <div>
      <NavBar />
      {showModal && (
        <div className={classes.modalMain}>
          <button
            className={classes.closeIcon}
            onClick={() => setShowModal(false)}
          >
            X
          </button>
          <form onSubmit={handleCreateTask}>
            <h3>Create Task</h3>
            <input
              placeholder="demo title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="demo description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Done</button>
          </form>
        </div>
      )}
      <div className={classes.header}>
        <h3>Task List:</h3>
        <button onClick={() => setShowModal(true)}>
          {" "}
          Add Task <MdLibraryBooks />{" "}
        </button>
      </div>
      <div className={classes.main}>
        {allTasks.length > 0 &&
          allTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDeleteClick={deleteTask} />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
