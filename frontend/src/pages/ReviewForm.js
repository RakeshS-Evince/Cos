import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { RatingComponent } from './RatingComponent';
import { useParams } from 'react-router-dom';
import useAuth from '../axios/useApi';
import { BASE_URL } from '../constants/constant';
const schema = yup.object({
    fullname: yup.string().required("Fullname is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required").min(50),
}).required();
function ReviewForm() {
    const authApi = useAuth()
    const [iceCreamData, setIceCreamData] = useState();
    const [reviewData, setReviewData] = useState();
    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    const { info } = useParams();
    useEffect(() => {
        authApi.get("/ice-creams/" + info.split('=')[2]).then(res => { setIceCreamData(res.data) }).catch(e => console.log(e))
        authApi.get("/user/reviews/?" + info).then(res => {
            setReviewData(res.data);
            setValue('fullname', res.data?.fullname);
            setValue('title', res.data?.title);
            setValue('description', res.data?.description);
        }).catch(e => console.log(e))

    }, [authApi, info, setValue])
    const onSubmit = (data) => {
        authApi.put(`/user/reviews/?${info}`, data).then(res => alert(res.data.message)).catch(e => console.log(e.response.data.message))
    }

    return (
        <div>
            <Container>
                <div className='card'>
                    <div className='row g-2 justify-content-center'>
                        <div className='col-md-5 p-3 p-lg-5'>
                            <img src={BASE_URL + 'images/' + iceCreamData?.image} className='img-fluid' height='350px' width='350px' alt="rev" />
                            <h5>{iceCreamData?.name}</h5>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, quisquam. Eos quasi mollitia, ipsa illo fugit</p>
                            <h5>Price: ₹{iceCreamData?.price}</h5>
                        </div>
                        <div className='col-md-5'>
                            <Form onSubmit={handleSubmit(onSubmit)} className='p-3'>
                                <div className=' d-flex justify-content-between'>
                                    <h4 className='pt-3'>Write a review</h4>
                                    <RatingComponent value={reviewData?.rating} info={info} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="fullname">Full Name</label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" isInvalid={errors?.fullname?.message} id='fullname' {...register('fullname')} disabled />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors?.fullname?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" isInvalid={errors?.title?.message} id='title' {...register('title')} />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors?.title?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <InputGroup hasValidation>
                                        <Form.Control as='textarea' type="text" isInvalid={errors?.description?.message} id='description' {...register('description')} />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors?.description?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <button type="submit" className=" mt-2 btn btn-primary">Submit</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ReviewForm
