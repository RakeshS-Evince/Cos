import React, { useState } from 'react'
import './profile.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { PROFILE } from '../constants/constant';
import Swal from 'sweetalert2';
import useApi from '../axios/useApi';
import Address from './Address';
import { Link } from 'react-router-dom';
const schema = yup.object({
    fullname: yup.string().required("fullname is required"),
    email: yup.string().required("email is required"),
    contact: yup.string().required("contact is required"),
    username: yup.string().optional(),
    city: yup.string().required("city is required"),
}).required("Password is required");
function Profile() {
    const authApi = useApi();
    const [displayAddreses, setDisplayAddress] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema), defaultValues: () => authApi.get(PROFILE).then(({ data }) => data)
    })

    const onSubmit = async (data) => {
        try {
            const res = await authApi.put(PROFILE, data);
            Swal.fire({
                title: res.data.message
            })
        } catch (e) {
            Swal.fire({ title: e.response.data.message })
        }
    }
    const toggleDisplayAddress = () => {
        setDisplayAddress(!displayAddreses)
    }
    return (
        <div>
            <div className="main-body">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{getValues('username')}</h4>
                                        {/* <button className="btn btn-outline-primary">Account Setting</button> */}
                                    </div>
                                </div>
                                <hr className="my-3" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6><Link to="/my-orders" style={{ textDecoration: "none" }}>Orders</Link></h6>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ cursor: 'pointer' }}>
                                        <h6 className='text-primary' onClick={() => toggleDisplayAddress()}>Addresses</h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputGroup hasValidation>
                                                <Form.Control type="text" isInvalid={errors?.fullname?.message} id='fullname' {...register('fullname')} />
                                                <Form.Control.Feedback type="invalid" >
                                                    {errors?.fullname?.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputGroup hasValidation>
                                                <Form.Control type="email" isInvalid={errors?.email?.message} id='email' name={"email"} {...register('email')} />
                                                <Form.Control.Feedback type="invalid" >
                                                    {errors?.email?.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Username</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputGroup hasValidation>
                                                <Form.Control type="text" disabled isInvalid={errors?.username?.message} id='username' {...register('username')} />
                                                <Form.Control.Feedback type="invalid" >
                                                    {errors?.username?.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Contact</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputGroup hasValidation>
                                                <Form.Control type="text" isInvalid={errors?.contact?.message} id='contact' {...register('contact')} />
                                                <Form.Control.Feedback type="invalid" >
                                                    {errors?.contact?.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">City</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputGroup hasValidation>
                                                <Form.Control type="text" isInvalid={errors?.city?.message} id='city' {...register('city')} />
                                                <Form.Control.Feedback type="invalid" >
                                                    {errors?.city?.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="submit" className="btn btn-primary px-4" value="Save Changes" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {displayAddreses && <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='d-flex justify-content-between'>
                                            <h4>Saved Addresses</h4>
                                            <Link to='/address/add' className='btn btn-primary'>Add</Link>
                                        </div>
                                        <p>Please check one to make default address for your orders.</p>
                                        <div className='row'>
                                            <Address />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
