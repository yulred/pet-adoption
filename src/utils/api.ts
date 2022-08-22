import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const Get = async (path: string) => {
  const res = await axios.get(BASE_URL + path, { withCredentials: true });
  return res.data;
}

export const Post = async (path: string, data: object, ) => {
  const res = await axios.post(BASE_URL + path, data, { withCredentials: true });
  return res.data;
}

export const Put = async (path: string, data: object, ) => {
  const res = await axios.put(BASE_URL + path, data, { withCredentials: true });
  return res.data;
}