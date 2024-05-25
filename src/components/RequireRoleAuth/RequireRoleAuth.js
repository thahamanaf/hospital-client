import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireRoleAuth = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.profile);
  return allowedRoles?.includes(Number(user?.role_id)) ? (
    <Outlet />
  ) : user.token ? (
    <>Un authorized</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default RequireRoleAuth;
