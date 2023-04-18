import React from 'react'
import './signIn.scss'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { api } from '../axios/axios'
import { REGISTER } from '../constants/constant';
import Swal from 'sweetalert2';
const schema = yup.object({
    username: yup.string().required("Fullname is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password'), null], 'Confirm password does not match')
}).required();

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        data.roleId = 1
        try {
            const res = await api.post(REGISTER, data);
            Swal.fire({
                title: res.data.message
            })
        } catch (e) {
            Swal.fire({ title: e.response.data.message })
        }

    }
    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center align-items-center pb-3 mt-5">
                <div className="col-xl-10 ">
                    <div className="card border-0 ">
                        <div className="card-body  p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Register</h3>
                                        </div>
                                        <h6 className="h5 mb-0">Welcome back!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter the fields to create an accou</p>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="email" isInvalid={errors?.email?.message} id='email' {...register('email')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.email?.message}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="username">User Name</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="text" isInvalid={errors?.username?.message} id='username' {...register('username')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.username?.message}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="password">Password</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="password" isInvalid={errors?.password?.message} id='password' {...register('password')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.password?.message}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </div>
                                            <div className="form-group mb-5">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="confirmPassword" isInvalid={errors?.confirmPassword?.message} id='confirmPassword' {...register('confirmPassword')} />
                                                    <Form.Control.Feedback type="invalid" >
                                                        {errors?.confirmPassword?.message}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <button type="submit" className="btn" style={{
                                                    backgroundColor: "#5369f8",
                                                    borderColor: "#5369f8",
                                                    color: "#fff"
                                                }}>Register</button>
                                                <Link to="" className="text-right text-primary">Forgot password?</Link></div>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">This  beautiful theme yours!</h4>
                                            <p className="lead text-white">"Best investment i made for a long time. Can only recommend it for other users."</p>
                                            <p>- Admin User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">Already have an account? <Link to="/login" className="text-primary ml-1">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register
