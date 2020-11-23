import axios from "axios";

export default axios.create({
  baseURL: "http://54.81.18.99/api/v1/",

  headers: {
    "Content-type": "application/json",
  },
});

export const BASE_URL = "http://54.81.18.99/api/v1/";
