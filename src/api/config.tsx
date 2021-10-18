import axios from "axios";

const url: string = process.env.REACT_APP_LOCAL_SERVER as string;

export const instance = axios.create({
    baseURL: url,
    responseType: "json",
    headers: { 
      "accept": "*/*", 
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": localStorage.getItem('token')
    },
  });
  