import axios from "axios";
import { useKeycloak } from "@react-keycloak/razzle";
import { useMemo } from "react";
import config from "./config";

const useAxios = () => {
  const [keycloak] = useKeycloak();
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: config.backendAddress,
        timeout: 5000,
        headers: {
          Pragma: "no-cache",
        },
      }),
    []
  );

  instance.interceptors.request.use((axiosConfig) => ({
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: keycloak.token ? `Bearer ${keycloak.token}` : undefined,
    },
  }));

  return instance;
};

export default useAxios;
