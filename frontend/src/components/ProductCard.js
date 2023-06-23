import React, { useContext } from 'react'
import { Store } from 'react-notifications-component';
import { addToCart, addToWishlist } from '../feature/cartSlice'
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../context/UserContextProvider';
import { RatingStars } from '../components/RatingStars';
import { IMAGE_URL } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
function ProductCard({ product }) {
    const { user } = useContext(UserContext);
    const wishlistItems = useSelector((state) => state.cart.wishlist);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartClickHandler = (data) => {
        if (!user?.isLoggedIn) {
            Swal.fire('You are not logged in please login and add items to cart');
            return
        }
        // showCart();
        dispatch(addToCart(data))
        Store.addNotification({
            title: "Item added to cart!",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        })
    }
    const wishlistClickHandler = (item) => {
        if (!user?.isLoggedIn) {
            Swal.fire('You are not logged in please login and add items to cart');
            return
        }
        dispatch(addToWishlist(item))
    };

    return (
        <>
            {product && <Card className='menu-card'>
                <Card.Img className='menu-image' onClick={() => navigate('/icecream-details/' + product?.id)} variant="top" src={IMAGE_URL + product?.image} height={"250px"} />
                <i style={{ right: 0, top: 0, zIndex: 2, fontSize: "27px", padding: "10px", cursor: "pointer" }} className={`text-danger bi bi-${wishlistItems.findIndex(item => item.id === product?.id) >= 0 ? "heart-fill" : "heart"} position-absolute `} onClick={() => {
                    wishlistClickHandler({
                        name: product?.name,
                        id: product?.id,
                        image: product?.image,
                        price: product?.price,
                        available: product?.quantity,
                        quantity: 1,
                    });
                }}></i>
                <Card.Body className='mt-2'>
                    <Card.Title className='menu-title' onClick={() => navigate('/icecream-details/' + product?.id)}>{product?.name}</Card.Title>
                    <Card.Text>
                        {product?.description}
                    </Card.Text>
                    <RatingStars value={product?.averageRating ? product?.averageRating : 0} size={"20px"} />
                    <div className='d-flex justify-content-between'>
                        <span className='mt-2'>Price: ₹{parseFloat(product?.price).toFixed(2)}</span>
                        <i style={{ right: 0, top: 0, zIndex: 2, fontSize: "27px", cursor: "pointer" }} className={`text-info bi bi-cart-plus`} onClick={() => {
                            cartClickHandler({
                                name: product?.name,
                                id: product?.id,
                                image: product?.image,
                                price: product?.price,
                                available: product?.quantity,
                                quantity: 1,
                            })
                        }}>
                        </i>
                    </div>
                </Card.Body>
            </Card>}
        </>

    )
}

export default ProductCard
