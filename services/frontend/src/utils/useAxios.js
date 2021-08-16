import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useMemo } from "react";

import config from "./runtimeConfig";

const useAxios = () => {
  const { keycloak } = useKeycloak();
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

  instance.interceptors.request.use(async (axiosConfig) => {
    await keycloak.updateToken();

    return {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        Authorization: keycloak.token ? `Bearer ${keycloak.token}` : undefined,
      },
    };
  });

  return instance;
};

export default useAxios;
