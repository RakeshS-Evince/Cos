import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContextProvider";
import { authApi } from "./axios";
import Swal from "sweetalert2";
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
            // Swal.fire(error.response.data.message, "", "error")
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
