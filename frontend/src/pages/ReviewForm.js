import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { RatingComponent } from './RatingComponent';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import useAuth from '../axios/useApi';
import { BASE_URL, REVIEW } from '../constants/constant';
import { RatingStars } from './RatingStars';
import Swal from 'sweetalert2';
import thumbs_smiley from '../assets/images/thumbs_smiley.png'
const schema = yup.object({
    fullname: yup.string().required("Fullname is required"),
    summary: yup.string().required("Summary is required"),
    review: yup.string().required("Review is required").min(50),
}).required();
function ReviewForm() {
    const authApi = useAuth()
    const [iceCreamData, setIceCreamData] = useState();
    const [reviewData, setReviewData] = useState();
    const [allow, setAllow] = useState(false)
    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate()
    const { state } = useLocation()
    useEffect(() => {
        if (!state) return navigate("/")
        authApi.get("/ice-creams/" + state?.iceCreamId).then(res => { setIceCreamData(res.data) }).catch(e => console.log(e))
        authApi.get(REVIEW + state?.iceCreamId).then(res => {
            setReviewData(res.data);
            if (!res.data.summary && !res.data.review && !res.data.rating) {
                setAllow(true)
            }
            setValue('fullname', res.data?.fullname);
            setValue('summary', res.data?.summary);
            setValue('review', res.data?.review);
        }).catch(e => console.log(e))
    }, [authApi, setValue, allow,navigate,state])
    const onSubmit = (data) => {
        authApi.post(REVIEW + state?.iceCreamId, { ...data, rating: reviewData.rating }).then(res => {
            if (!reviewData?.rating) {
                alert("Please rate this item between 1 to 5 stars");
                return
            }
            Swal.fire({
                summary: 'Review Submitted!',
                text: 'Thanks for the review.',
                imageUrl: thumbs_smiley,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom rev',
            })
            setAllow(false);
        }).catch(e => console.log(e.response.data.message))
    }
    console.log(allow)
    return (
        <div>
            <Container>
                <div className='card'>
                    <div className='row g-2 justify-content-center'>
                        <div className='col-md-5 p-3 p-lg-5'>
                            <img src={BASE_URL + 'images/' + iceCreamData?.image} className='img-fluid' height='350px' width='350px' alt="rev" />
                            <Link to={'/icecream-details/' + state?.iceCreamId} style={{ textDecoration: 'none' }}><h5>{iceCreamData?.name}</h5></Link>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, quisquam. Eos quasi mollitia, ipsa illo fugit</p>
                            <h5>Price: ₹{iceCreamData?.price}</h5>
                        </div>
                        <div className='col-md-5'>
                            <Form onSubmit={handleSubmit(onSubmit)} className='p-3'>
                                <div className=' d-flex justify-content-between'>
                                    <h4 className='pt-3'>Write a review</h4>
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
                                    <label htmlFor="summary">Summary</label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" isInvalid={errors?.summary?.message} id='summary' {...register('summary')} disabled={!allow} />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors?.summary?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="review">Review</label>
                                    <InputGroup hasValidation>
                                        <Form.Control as='textarea' type="text" isInvalid={errors?.review?.message} id='review' disabled={!allow} {...register('review')} />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors?.review?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div>
                                    <lable>Rate the Icecream</lable>
                                    {allow ? <RatingComponent value={reviewData?.rating} reviewData={reviewData} setReviewData={setReviewData} /> : <RatingStars value={reviewData?.rating} />}
                                </div>
                                {!allow ? <p className='text-danger mt-3'>Thanks for the review</p> : <button type="submit" disabled={!allow} className=" mt-2 btn btn-primary">Submit</button>}
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ReviewForm
