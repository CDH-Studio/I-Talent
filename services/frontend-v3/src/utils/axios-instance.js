import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import config from "./config";

const useAxios = () => {
  const { backendAddress } = config;
  const [keycloak, initialized] = useKeycloak();
  const instance = axios.create({
    baseURL: backendAddress,
    timeout: 5000,
    headers: {
      Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
      Pragma: "no-cache",
    },
  });
  return instance;
};

export default useAxios;
