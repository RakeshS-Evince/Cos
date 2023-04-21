import { useContext, useEffect } from 'react'
import UserContextProvider, { UserContext } from '../context/UserContextProvider'
import jwt_decode from "jwt-decode";

function useRoleCheck() {
    const { user } = useContext(UserContext);
    let isAdmin = false;
    let isStaff = false;
    const validRole = () => {
        if (!user?.token) {
            return
        }
        var decoded = jwt_decode(user?.token);
        if (decoded.roleId === 3) {
            isAdmin = true;
        }
        if (decoded.roleId === 2) {
            isStaff = true;
        }
    }
    validRole();
    return { isAdmin, isStaff }
}

export default useRoleCheck
