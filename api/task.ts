import { API_URL } from "@/constants/api";
import { newTask, updateTask } from "@/types/task";
import axios from "axios";
import Cookies from "js-cookie";

export const postTask = async (newTask: newTask) => {
  const url = API_URL + "/tasks";
  const token = Cookies.get("token");

  let response = await axios
    .post(url, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};

export const getTasks = async () => {
  const url = API_URL + "/tasks";
  const token = Cookies.get("token");

  let response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};

export const getTask = async (taskId: string) => {
  const url = API_URL + `/tasks/${taskId}`;
  const token = Cookies.get("token");

  let response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};

export const patchTask = async (updateTask: updateTask) => {
  const url = API_URL + `/tasks/${updateTask.id}`;
  const token = Cookies.get("token");

  let response = await axios
    .patch(url, updateTask, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};

export const deleteTask = async (taskId: string | undefined) => {
  const url = API_URL + `/tasks/${taskId}`;
  const token = Cookies.get("token");

  let response = await axios
    .delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};
