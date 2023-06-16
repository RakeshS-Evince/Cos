import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { BASE_URL } from '../constants/constant'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
function LoginSuccessPage() {
    const navigate = useNavigate();
    const { saveUser } = useContext(UserContext)
    useEffect(() => {
        axios.get(BASE_URL + "auth/test", { withCredentials: "true" }).then(res => {
            saveUser({ isLoggedIn: true, token: res.data.token, userId: res.data.id, username: res.data.username });
            navigate('/');
        }).catch(e => navigate("/"))
    }, [navigate, saveUser]);
    return (
        <div>
            <h1>Login successful</h1>
        </div>
    )
}

export default LoginSuccessPage
