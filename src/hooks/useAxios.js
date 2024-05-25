import axios from "../helpers/axios";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const useAxios = () => {
  const user = useSelector((state) => state.auth.profile);
  const refreshToken = useRefreshToken();
  const [accessToken, setToken] = useState(user?.token);
  const getAccessToken = async () => {
    if (user?.token) {
      setToken(user?.token);
      return;
    }
    return setToken(await refreshToken());
  };

  useEffect(() => {
    if (!accessToken) {
      getAccessToken();
    }
    const request = axios.interceptors.request.use(
      async (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const response = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return error;
      }
    );
    return () => {
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, [user, refreshToken, accessToken]);

  return axios;
};

export default useAxios;
