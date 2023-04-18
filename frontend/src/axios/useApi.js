import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContextProvider";
import { authApi } from "./axios";
function useAuth() {
    const { user, logout } = useContext(UserContext);
    useEffect(() => {
        let reqInterceptor = authApi.interceptors.request.use(async config => {
            config.headers = { 'Authorization': `Bearer ${user?.token}` };
            return config;
        });
        let resInterceptor = authApi.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            console.log(error.response.data.message)
        }
        );
        return () => {
            authApi.interceptors.request.eject(reqInterceptor);
            authApi.interceptors.response.eject(resInterceptor);
        };
    }, [user, logout]);

    return authApi

}

export default useAuth
