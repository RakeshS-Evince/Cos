import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { PROFILE } from '../constants/constant';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';
import useApi from '../axios/useApi';

const schema = yup.object({
    fullname: yup.string().required("fullname is required"),
    email: yup.string().email('Please enter a valid email').required("email is required"),
    contact: yup.string().matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).required("contact is required"),
    username: yup.string().optional(),
})
function AccountSection() {
    const authApi = useApi();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), defaultValues: () => authApi.get(PROFILE).then(({ data: { id, ...rest } }) => rest)
    })

    const onSubmit = async (data) => {
        try {
            const res = await authApi.put(PROFILE, data);
            Swal.fire({
                title: res.data.message
            })
        } catch (e) {
        }
    }

    return (
        <div>
            <div className='mb-3'> <strong>My Account</strong></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" mb-3">
                    <div className="text-secondary">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="basic-addon1"><i className='bi bi-person'></i></InputGroup.Text>
                            <Form.Control type="text" isInvalid={errors?.fullname?.message} id='fullname' placeholder="fullname" {...register('fullname')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.fullname?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                </div>
                <div className=" mb-3">

                    <div className="text-secondary">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="basic-addon2"><i className='bi bi-envelope'></i></InputGroup.Text>
                            <Form.Control type="email" isInvalid={errors?.email?.message} id='email' placeholder="email" name={"email"} {...register('email')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.email?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                </div>
                <div className=" mb-3">
                    <div className="text-secondary">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="basic-addon3">@</InputGroup.Text>
                            <Form.Control type="text" disabled isInvalid={errors?.username?.message} id='username' placeholder="username" {...register('username')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.username?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="text-secondary">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="basic-addon4"><i className='bi bi-phone'></i></InputGroup.Text>
                            <Form.Control type="text" isInvalid={errors?.contact?.message} id='contact' placeholder="contact" {...register('contact')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.contact?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger w-100" value="Save Changes" />
            </form>
        </div>
    )
}

export default AccountSection
