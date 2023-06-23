import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL, ICECREAM } from '../constants/constant';
export const UserContext = createContext({});
function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(BASE_URL + ICECREAM).then((res) => {
            setProducts(res?.data?.data);
        });
    }, []);
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
        <UserContext.Provider value={{ user, saveUser, logout, products }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
