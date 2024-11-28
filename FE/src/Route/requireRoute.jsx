import { useSelector } from "react-redux";
import { userData } from "../Store/user";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireRoute = ({ allowedRoles }) => {
  const reduxData = useSelector(userData);
  console.log(reduxData.role )
  const location = useLocation();

  const hasAllowedRole =
    reduxData?.role && allowedRoles?.includes(reduxData.role);

  return hasAllowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireRoute;
