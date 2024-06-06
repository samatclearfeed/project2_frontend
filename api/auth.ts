import { API_URL } from "@/constants/api";
import { creds, newUser } from "@/types/auth";
import axios from "axios";

export const signUp = async (userData: newUser) => {
  const url = API_URL + "/users";

  let response = await axios
    .post(url, userData)
    .catch((error) => error.response);

  return response.data;
};

export const signIn = async (creds: creds) => {
  const url = API_URL + "/users/login";

  let response = await axios.post(url, creds).catch((error) => error.response);

  return response.data;
};

export const getUser = async (token: string | undefined) => {
  const url = API_URL + "/users";

  let response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => error.response);

  return response.data;
};
