import React, { useContext, useState } from 'react'
import './signIn.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { api } from '../axios/axios'
import { LOGIN } from '../constants/constant';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContextProvider';
const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
}).required();
function Login() {
    const navigate = useNavigate();
    const { saveUser } = useContext(UserContext)
    const [checked, setChecked] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        try {
            const res = await api.post(LOGIN, data);
            Swal.fire({
                title: res.data.message
            })
            saveUser({ isLoggedIn: true, token: res.data.token, userId: res.data.id, username: res.data.username });
            navigate('/')
        } catch (e) {

        }
    }

    const googleLogin = async () => {
        window.open("http://localhost:3000/auth/login/google", "_self");
    }
    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center align-items-center  pb-3 mt-5">
                <div className="col-xl-10 ">
                    <div className="card border-0 ">
                        <div className="card-body  p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                        </div>
                                        <h6 className="h5 mb-0">Welcome back!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter your username and password to login</p>
                                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className="form-group mb-2">
                                                <label htmlFor="username">User Name</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="text" isInvalid={errors?.username?.message} id='username' {...register('username')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.username?.message}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </div>
                                            <div className="form-group mb-5">
                                                <label htmlFor="password">Password</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type={checked ? 'text' : "password"} isInvalid={errors?.password?.message} id='password' {...register('password')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.password?.message}
                                                    </Form.Control.Feedback>
                                                    <span style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        top: 0,
                                                        padding: "8px",
                                                        cursor: "pointer"
                                                    }} onClick={() => setChecked(!checked)}><i title={!checked ? 'show' : 'hide'} className={`bi bi-eye${!checked ? '' : '-slash'}`}></i></span>
                                                </InputGroup>

                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <button type="submit" className="btn" style={{
                                                    backgroundColor: "#5369f8",
                                                    borderColor: "#5369f8",
                                                    color: "#fff"
                                                }}>Login</button>
                                                <Link to="/forgot-password" className="text-right text-primary mt-2" style={{ textDecoration: "none" }}>Forgot password?</Link></div>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <p>or sign up with:</p>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button type="button" onClick={() => googleLogin()} className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-google"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">Don't have an account? <Link to="/register" className="text-primary ml-1" style={{ textDecoration: "none" }}>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
