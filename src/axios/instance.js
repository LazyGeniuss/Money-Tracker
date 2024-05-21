import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default instance;
