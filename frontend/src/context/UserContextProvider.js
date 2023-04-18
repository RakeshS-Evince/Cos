import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext({});
function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, []);
    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/')
    }
    const saveUser = (data) => {
        localStorage.setItem("user", JSON.stringify({ ...user, ...data }))
        setUser({ ...user, ...data })
    }
    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
