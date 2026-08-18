import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../auth";

const PrivateRoute = () => {

    const { request } = useAuth();

    const [isAuth, setIsAuth] = useState(null);

    const checkAuth=async()=>{
         await request.get("/auth")
            .then(() => {
                setIsAuth(true);
            })
            .catch(() => {
                setIsAuth(false);
            });
    }
    useEffect(() => {

       checkAuth()

    }, []);

    if (isAuth === null) {
        return <></>;
    }

    return isAuth ? <Outlet /> : <Navigate to="*" replace />;
};

export default PrivateRoute;