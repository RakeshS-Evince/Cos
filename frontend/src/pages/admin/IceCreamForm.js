import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useAuth from '../../axios/useApi';
import { ADMIN, BRANDS, ICECREAM } from '../../constants/constant';
import Swal from 'sweetalert2';
const iceCreamSchema = yup.object({
    name: yup.string().required("Ice Cream name is required"),
    image: yup.mixed().required("Image is required"),
    price: yup.string().required("Price is required"),
    description: yup.string().required("Description is required"),
    brandName: yup.string().required("BrandName is required"),
    quantity: yup.string().required('Quantity is required'),
})
function IceCreamForm({ id, setShowIcecreamForm, setId, refetch }) {
    const authApi = useAuth();
    const [brands, setBrands] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(iceCreamSchema),
        defaultValues: id ? () => authApi.get(ICECREAM + id).then(({ data }) => data).catch(e => console.log(e.response.messsage)) : {}
    })
    useEffect(() => { authApi.get(BRANDS).then((res) => setBrands(res.data)) }, [authApi])
    const onSubmit = (data) => {
        if (!data.image[0]) alert('Please select an image');
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('quantity', data.quantity)
        formData.append('brandName', data.brandName)
        formData.append('description', data.description)
        formData.append('image', data.image[0]);

        if (id) {
            authApi.put(ADMIN + ICECREAM + id, formData).then(res => {
                res && Swal.fire(res.data.message);
                setId('');
                refetch();
                setShowIcecreamForm(false)
            }).catch(e => console.log(e.response.data.message))
            return
        }
        authApi.post(ADMIN + ICECREAM, formData).then(res => {
            res && Swal.fire(res.data.message);
            setId('');
            refetch();
            setShowIcecreamForm(false)
        }).catch(e => console.log(e.response.data.message))
    }
    return (
        <div>
            <div className='card mb-2'>
                <div className='card-body '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup hasValidation className='row'>
                            <Form.Label htmlFor='name' className='col-sm-2 col-form-label'>Ice-Cream Name: </Form.Label>
                            <div className='col-sm-10'><Form.Control type="text" isInvalid={errors?.name?.message} id='name' {...register('name')} />
                                <Form.Control.Feedback type="invalid" >
                                    {errors?.name?.message}
                                </Form.Control.Feedback>
                            </div>
                        </InputGroup>
                        <InputGroup hasValidation className='row my-2'>
                            <Form.Label htmlFor='description' className='col-sm-2 col-form-label'>Description: </Form.Label>
                            <div className='col-sm-10'><Form.Control as={'textarea'} type="text" isInvalid={errors?.description?.message} id='description' {...register('description')} />
                                <Form.Control.Feedback type="invalid" >
                                    {errors?.desription?.message}
                                </Form.Control.Feedback>
                            </div>
                        </InputGroup>
                        <InputGroup hasValidation className='row my-2'>
                            <Form.Label htmlFor='price' className='col-sm-2 col-form-label'>Price: </Form.Label>
                            <div className='col-sm-10'><Form.Control type="text" isInvalid={errors?.price?.message} id='price' {...register('price')} />
                                <Form.Control.Feedback type="invalid" >
                                    {errors?.price?.message}
                                </Form.Control.Feedback></div>
                        </InputGroup>
                        <InputGroup hasValidation className='row my-2'>
                            <Form.Label htmlFor='quantity' className='col-sm-2 col-form-label'>Quantity: </Form.Label>
                            <div className='col-sm-10'><Form.Control type="text" isInvalid={errors?.quantity?.message} id='quantity' {...register('quantity')} />
                                <Form.Control.Feedback type="invalid" >
                                    {errors?.quantity?.message}
                                </Form.Control.Feedback></div>
                        </InputGroup>
                        <InputGroup hasValidation className='row my-2'>
                            <Form.Label htmlFor='brandName' className='col-sm-2 col-form-label'>BrandName: </Form.Label>
                            <div className='col-sm-10'><Form.Select isInvalid={errors?.brandName?.message} id='brandName' {...register('brandName')} >
                                <option></option>
                                {brands?.map((ele, i) => (
                                    <option key={i}>{ele.name}</option>
                                ))}
                            </Form.Select>

                                <Form.Control.Feedback type="invalid" >
                                    {errors?.brandName?.message}
                                </Form.Control.Feedback></div>
                        </InputGroup>
                        <InputGroup hasValidation className='row my-2'>
                            <Form.Label htmlFor='image' className='col-sm-2 col-form-label '>Image: </Form.Label>
                            <div className='col-sm-10'><Form.Control type="file" isInvalid={errors?.image?.message} id='image' {...register('image')} />
                                <Form.Control.Feedback type="invalid" >
                                    {errors?.image?.message}
                                </Form.Control.Feedback>
                            </div>
                        </InputGroup>
                        <div className='d-flex justify-content-end' style={{ marginRight: "30px" }}><div><button className='btn btn-danger me-2' onClick={() => { setShowIcecreamForm(false); setId('') }}>Back</button></div><button className='btn btn-success'>Save</button></div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default IceCreamForm
