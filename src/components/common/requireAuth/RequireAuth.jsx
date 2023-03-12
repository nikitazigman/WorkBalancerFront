import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import config from "../../../configs/config"

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation();

    return (
        auth?.user ?
            <Outlet />
            : <Navigate to={config.links.sign_in} state={{ from: location }} replace />
    );
}

export default RequireAuth