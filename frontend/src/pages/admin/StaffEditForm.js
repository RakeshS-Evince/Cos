import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { STAFF } from '../../constants/constant';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';
import useAuth from '../../axios/useApi';
const schema = yup.object({
    fullname: yup.string().optional(),
    email: yup.string().email('Please enter a valid email').optional(),
    contact: yup.string().optional(),
    username: yup.string().optional(),
}).required();

function StaffEditForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const { id } = useParams();
    const authApi = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        authApi.get(STAFF + id).then(res => {
            setValue('fullname', res?.data?.fullname)
            setValue('username', res?.data?.username)
            setValue('email', res?.data?.email)
            setValue('contact', res?.data?.contact)
        })
    }, [id, authApi, setValue])
    const onSubmit = async (data) => {
        try {
            const res = await authApi.put(STAFF + id, data);
            Swal.fire({
                title: res.data.message
            }).then(navigate('/staff'))

        } catch (e) {
            Swal.fire({ title: e.response.data.message })
        }

    }
    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center align-items-center pb-3">
                <div className="mb-2">
                    <h3 className=" my-3 font-weight-bold text-theme">Staff account update</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="fullname">Fullname</label>
                        <InputGroup hasValidation>
                            <Form.Control type="text" isInvalid={errors?.fullname?.message} id='fullname' {...register('fullname')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.fullname?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <InputGroup hasValidation>
                            <Form.Control type="email" isInvalid={errors?.email?.message} id='email' {...register('email')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.email?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <InputGroup hasValidation>
                            <Form.Control type="text" isInvalid={errors?.contact?.message} id='contact' {...register('contact')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.contact?.message}
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
                    <button type="submit" className="btn mt-3" style={{
                        backgroundColor: "#5369f8",
                        borderColor: "#5369f8",
                        color: "#fff"
                    }}>Save</button>
                </form>
            </div>
        </div>

    )
}

export default StaffEditForm
