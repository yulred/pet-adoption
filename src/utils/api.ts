import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const Post = (data: object, path: string) => {
  return axios.post(BASE_URL + path, data);
}

export const Get = (path: string) => {
  return axios.get(BASE_URL + path)
    .then(res => res.data)
}