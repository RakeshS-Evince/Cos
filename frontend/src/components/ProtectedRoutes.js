import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider';
function ProtectedRoutes() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    if (isLoading) return <h1>Loading...</h1>
    else if (user?.isLoggedIn) return <Outlet />
    else {
        return <Navigate to="/" replace />;
    }
}

export default ProtectedRoutes
