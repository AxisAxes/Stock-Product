import axios from "axios";

const ApiController = axios.create({
    baseURL: "https://localhost:8888",
});

export default ApiController;