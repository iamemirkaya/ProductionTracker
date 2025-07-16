import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { selectIsAuthenticated } from "../../features/auth/authSlice";



export default function ProtectedRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}