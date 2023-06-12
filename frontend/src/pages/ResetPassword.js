import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import { authApi } from "../axios/axios";
import { BASE_URL, RESET_PASSWORD } from "../constants/constant";
import Swal from "sweetalert2";
const schema = yup.object({
    newPassword: yup.string().required("Password is required")
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('newPassword'), null], 'Confirm password do not match')
}).required();
const ResetPassword = () => {
    const { token } = useParams();
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate();
    const onSubmit = (data) => {
        authApi.put(BASE_URL + RESET_PASSWORD, data, { headers: { Authorization: "Bearer " + token } }).then((res) => {
            Swal.fire(res.data.message);
            navigate('/login', { replace: true });
        }).catch(e => {
            console.log(e.response.data.message)
        })
    }
    return (
        <div className="card">
            <div className="card-body p-5">
                <h3>Reset Password</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-2">
                        <label htmlFor="newPassword">New Password</label>
                        <InputGroup hasValidation>
                            <Form.Control type="password" isInvalid={errors?.newPassword?.message} id='newPassword' {...register('newPassword')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.newPassword?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Confirm Password</label>
                        <InputGroup hasValidation>
                            <Form.Control type="password" isInvalid={errors?.confirmPassword?.message} id='confirmPassword' {...register('confirmPassword')} />
                            <Form.Control.Feedback type="invalid" >
                                {errors?.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                    <button type="submit" className=" mt-2 btn btn-primary">Reset Password</button>
                </Form>
            </div>
        </div>
    )
}
export default ResetPassword;