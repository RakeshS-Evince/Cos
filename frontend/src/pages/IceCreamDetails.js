import React, { useContext, useEffect, useMemo, useState } from 'react'
import { RatingComponent } from './RatingComponent'
import useAuth from '../axios/useApi';
import { BASE_URL, ICECREAM } from '../constants/constant';
import { useParams } from 'react-router-dom';
import { RatingStars } from './RatingStars';
import { useDispatch } from 'react-redux';
import { UserContext } from '../context/UserContextProvider';
import { addToCartWithMoreQuantity } from '../feature/cartSlice'
import Swal from 'sweetalert2';

function IceCreamDetails() {
    const [icDetails, setIcDetails] = useState();
    const [reviews, setReviews] = useState();
    const [quantity, setQuantity] = useState(1);
    const [averageRating, setAverageRating] = useState(0)
    const authApi = useAuth();
    const { user } = useContext(UserContext)
    const dispatch = useDispatch()
    const { id } = useParams();
    const showCart = () => {
        document.getElementById('cartSidebar').classList.add('cart_wrapper_show');
    }
    const cartClickHandler = (data) => {
        if (!user?.isLoggedIn) {
            Swal.fire('You are not logged in please login and add items to cart');
            return
        }
        showCart();
        dispatch(addToCartWithMoreQuantity(data))
    }
    const quantityChangeHandler = (e) => {
        setQuantity(e.target.value)
    }
    useEffect(() => {
        authApi.get(ICECREAM + '/' + id).then(res => setIcDetails(res.data)).catch(e => console.log(e));
        authApi.get('/user-reviews/' + id).then(res => {
            setReviews(res.data?.data)
            setAverageRating(res.data?.averageRating)

        }).catch(e => console.log(e))

    }, [authApi, id])
    return (
        <div>
            <div className='container mt-3'>
                {icDetails &&
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='p-3'>
                                <img src={BASE_URL + 'images/' + icDetails?.image} alt='details' className='img-fluid' height={'400px'} width={'400px'} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='p-3'>
                                <h3 >{icDetails?.name}</h3>
                                <h4 className='pt-3'>Price: ₹{icDetails?.price}</h4>
                                <h6 className={`pt-3`}>Stock: <span className={icDetails?.quantity > 1 ? 'text-success' : 'text-danger'}>{icDetails?.quantity > 1 ? 'Avaliable' : 'Out of stock'}</span></h6>
                                <p className='pt-3'>{icDetails?.description}</p>
                                <div className='d-flex pt-3'>
                                    <input type='number' value={quantity} min={1} className='form-control me-3' onChange={quantityChangeHandler} style={{ width: '80px' }} />
                                    <button className='btn btn-danger' disabled={quantity > icDetails?.quantity || quantity < 1} onClick={() => cartClickHandler({
                                        name: icDetails?.name,
                                        description: icDetails?.description,
                                        id: icDetails?.id,
                                        image: icDetails?.image,
                                        price: icDetails?.price,
                                        available: icDetails?.quantity,
                                        quantity: parseInt(quantity),
                                    })} >Add to cart</button>

                                </div>
                                <p className='text-danger mt-2'>{quantity > icDetails?.quantity && 'The quantity is not available'}</p>
                                <p className='text-danger mt-2'>{quantity < 1 && 'Invalid quantity'}</p>
                                <div className='d-flex pt-5'>
                                    <h5 className='pt-3 me-2'>Average Rating: </h5> <RatingStars value={averageRating} /> <span className='pt-3 ms-2'>{averageRating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <hr />
                <h3 className='p-3'>Reviews</h3>
                <div className='p-3'>
                    {reviews?.length ?
                        reviews?.map((rev, i) => {
                            return (
                                <div key={'rev' + i + 1}>
                                    <h5>{rev?.customer?.fullname}</h5>
                                    {/* <h5>{rev?.title}</h5> */}
                                    <p>{rev?.description}</p>
                                    <div className='d-flex'>
                                        <p className='pt-3'>Rating: </p>
                                        <RatingStars value={rev.rating} />
                                        <span className='pt-3 ms-2'>{rev.rating}</span>
                                    </div>

                                </div>
                            )
                        })
                        : <h4>No reviews</h4>}

                </div>
            </div>
        </div>
    )
}

export default IceCreamDetails
