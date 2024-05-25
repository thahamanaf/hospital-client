import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RequireAppAuth = () => {
  const [isLoading, setIdLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useSelector((state) => state.auth.profile);
  const verifyUser = async () => {
    await refresh().finally(() => {
      setIdLoading(false);
    });
  };

  useEffect(() => {
    if (!user.token) {
      verifyUser();
    }
  }, []);

  return (
    <>
      {user?.token ? (
        <Outlet />
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <>
          Not authorized{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Click here to go back to login page.
          </Link>{" "}
        </>
      )}
    </>
  );
};

export default RequireAppAuth;
