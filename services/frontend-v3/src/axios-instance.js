import axios from "axios";
import config from "./config";

const { backendAddress } = config;

const instance = axios.create({
  baseURL: backendAddress,
  timeout: 1000,
});

export default instance;
