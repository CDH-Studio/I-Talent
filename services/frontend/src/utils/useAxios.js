import { useMemo } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

import config from "./runtimeConfig";

const useAxios = () => {
  const { keycloak } = useKeycloak();
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: config.backendAddress,
        headers: {
          Pragma: "no-cache",
        },
        timeout: 5000,
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
