import axios from "../helpers/axios";
import { jwtDecode } from "jwt-decode";
import { setUserProfile } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refreshToken = async () => {
    const response = await axios
      .get("auth/new-token", {
        withCredentials: true,
      })
      .then((res) => res)
      .catch((err) => err);

    if (response?.data?.status) {
      const { accessToken } = response.data;
      sessionStorage?.setItem("accessToken", accessToken);
      const decodedData = jwtDecode(accessToken).data;
      dispatch(setUserProfile({ ...decodedData, token: accessToken }));
      return accessToken;
    } else {
      sessionStorage?.removeItem("accessToken");
    }
  };
  return refreshToken;
};

export default useRefreshToken;
