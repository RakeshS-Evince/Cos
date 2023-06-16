import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { ICECREAM, IMAGE_URL, PUBLIC_REVIEWS } from '../constants/constant';
import { useParams } from 'react-router-dom';
import { RatingStars } from './RatingStars';
import { useDispatch } from 'react-redux';
import { UserContext } from '../context/UserContextProvider';
import { addToCartWithMoreQuantity } from '../feature/cartSlice'
import Swal from 'sweetalert2';

function IceCreamDetails() {
    const [icDetails, setIcDetails] = useState();
    const [reviews, setReviews] = useState();
    const [defaultActive, setDefaultActive] = useState(true);
    const [price, setPrice] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [sizes, setSizes] = useState([
        { size: "50ml", selected: false, active: false },
        { size: "100ml", selected: false, active: false },
        { size: "200ml", selected: false, active: false },
        { size: "500ml", selected: false, active: false },
        { size: "1l", selected: false, active: false },
    ])
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
        authApi.get(PUBLIC_REVIEWS + id).then(res => {
            if (res.data) {
                setReviews(res?.data?.data.reverse())
                setAverageRating(res?.data?.averageRating)
            }
        })
        let newArr = sizes;
        authApi.get(ICECREAM + id).then(res => {
            setIcDetails(res?.data);
            for (let i = 0; i < newArr.length; i++) {
                for (let j = 0; j < res?.data?.sizes?.length; j++) {
                    if (newArr[i].size === res?.data?.sizes[j]?.size) {
                        newArr[i]["active"] = true;
                        newArr[i]["id"] = res?.data?.sizes[j].id;
                        newArr[i]["priceBySize"] = res?.data?.sizes[j].priceBySize;
                    }
                }
            }
            setSizes(newArr);
        });

    }, [authApi, id]);

    const changeSizeHandler = (element) => {
        setDefaultActive(false);
        let newArr = sizes.map(ele => ele.id === element.id ? { ...ele, selected: true } : { ...ele, selected: false });
        setSizes(newArr);
        setPrice(element.priceBySize.price)
    }
    return (
        <div>
            {icDetails && <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className='p-3'>
                            <img src={IMAGE_URL + icDetails?.image} alt='details' className='img-fluid' height={'400px'} width={'400px'} />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='p-3'>
                            <h3 >{icDetails?.name}</h3>
                            <h4 className='pt-3'>Price: ₹{price || icDetails.price}</h4>
                            <h6 className={`pt-3`}>Stock: <span className={icDetails?.quantity >= 1 ? 'text-success' : 'text-danger'}>{icDetails?.quantity >= 1 ? 'Avaliable' : 'Out of stock'}</span></h6>
                            <p className='pt-3'>{icDetails?.description}</p>
                            <div className='d-flex'>
                                <div className='me-2'>
                                    <input type='radio' id={"default"} checked={defaultActive} className="btn-check" autocomplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor={"default"}>{"35ml"}</label><br></br>
                                </div>
                                {sizes?.length && sizes.map((ele, i) => {
                                    return <div key={i} className='me-2'>
                                        <input disabled={!ele.active} type='radio' id={ele.id + ele.size} checked={ele.selected} onChange={() => changeSizeHandler(ele)} className="btn-check" autocomplete="off" />
                                        <label className="btn btn-outline-primary" htmlFor={ele.id + ele.size}>{ele.size}</label><br></br>
                                    </div>
                                })}
                            </div>
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
                <hr />
                <h3 className='p-3'>Reviews</h3>
                <div className='p-3'>
                    {reviews?.length ?
                        reviews?.map((rev, i) => {
                            return (
                                <div key={i}>
                                    <div className='row g-3'>
                                        <div className='col-md-2'>
                                            <img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="user" className="rounded-circle" width="110" height={90} />
                                            <p className=''>{rev?.customer?.fullname}</p>
                                        </div>
                                        <div className='col-md-10'>
                                            <h5>{rev?.summary}</h5>
                                            <p>{rev?.review}</p>
                                            <div className='row justify-content-between'>
                                                <div className='d-flex col-auto'>
                                                    <p className='pt-3'>Rating: </p>
                                                    <RatingStars value={rev.rating} />
                                                    <span className='pt-3 ms-2'>{rev.rating}</span>
                                                </div>
                                                <div className='text-muted col-auto pt-sm-3'>{new Date(rev.createdAt).toDateString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                        : <h4>No reviews</h4>}

                </div>
            </div>}
        </div>
    )
}

export default IceCreamDetails
