import { TaskContext } from "@/context/task";
import { statusType } from "@/types/task";
import React, { useContext, useEffect, useState } from "react";
import { getTimeDifference } from "./helper";
import NavBar from "./navBar";
import classes from "@/styles/task.module.css";
import { MdEdit } from "react-icons/md";

type TaskProps = {
  taskId: string;
};

const Task: React.FC<TaskProps> = ({ taskId }) => {
  const { currentTask, updateTask, selectTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<statusType>(statusType.closed);

  useEffect(() => {
    setTitle(currentTask?.title || "");
    setDescription(currentTask?.description || "");
    setStatus(currentTask?.status || statusType.closed);
  }, [currentTask]);

  useEffect(() => {
    selectTask(taskId);
  }, [taskId]);

  const handleUpdateTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("title and description should not be empty!");
      return;
    }

    updateTask({ id: taskId, title, description, status });

    setShowModal(false);
  };

  const statusColor = {
    closed: "green",
    open: "#0B60B0",
    "in progress": "red",
  };

  return (
    <div>
      <NavBar />
      <div className={classes.main}>
        {showModal && (
          <div className={classes.modalMain}>
            <button
              className={classes.closeIcon}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <form onSubmit={handleUpdateTask}>
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
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value == statusType.closed
                      ? statusType.closed
                      : e.target.value == statusType.inProgress
                      ? statusType.inProgress
                      : statusType.open
                  )
                }
              >
                <option>{statusType.closed}</option>
                <option>{statusType.open}</option>
                <option>{statusType.inProgress}</option>
              </select>
              <button type="submit">Done</button>
            </form>
          </div>
        )}
        <div className={classes.taskContent}>
          <div className={classes.taskTitle}>
            <h4>{title}</h4>
            <button
              style={{ color: "#0B60B0" }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              {" "}
              <MdEdit /> Edit{" "}
            </button>
          </div>
          <p className={classes.taskDescription}>{description}</p>
          <div className={classes.taskInfo}>
            <p style={{ color: statusColor[status] }}>status: {status}</p>
            <p style={{ fontWeight: "600", color: "grey" }}>
              created{" "}
              {`${
                currentTask && getTimeDifference(currentTask.createdAt)
              } hrs ago`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
