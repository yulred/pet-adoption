import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://tranquil-everglades-31307.herokuapp.com/";

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

export const Delete = async (path: string, data: object ) => {
  const res = await axios.delete(BASE_URL + path, { data: data, withCredentials: true });
  return res.data;
}