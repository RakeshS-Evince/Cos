import React from 'react'
import "./cart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, selectCart, removeFromCart } from '../feature/cartSlice'
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
function CartSidebar() {
    const items = useSelector(selectCart);
    const total = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();
    const deleteHandler = async (item) => {
        Swal.fire({
            title: 'Are you sure to remove this item from your cart?',
            text: "",
            icon: 'warning',
            showCancelButton: true,

            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromCart(item))
                Swal.fire(
                    'Removed!',
                    'Your item removed from cart',
                    'success'
                )
            }
        })
    }
    const toggleCart = () => {
        document.getElementById('cartSidebar').classList.toggle('cart_wrapper_show');
    }
    return (
        <>
            <div className='cart_wrapper shadow' id="cartSidebar">
                <div>
                    <i className="bi bi-x-lg" onClick={() => toggleCart()} style={{ cursor: 'pointer' }}></i>
                    <h3 className='px-4 text-center text-info' >Items</h3>
                </div>
                {
                    !items.length ? <p className='px-4'>Your cart looks empty,
                        <br />    shop and enjoy our delicious Icecreams</p> :
                        <div className='row align-items-between'>
                            {items.map((ele, i) => (
                                <div key={i} className='mt-1 mx-2 '>
                                    <div style={{ cursor: "pointer", width: "15px" }} onClick={() => { deleteHandler(ele) }}>&times;</div>
                                    <div className="row justify-content-between mx-2 py-2 border border-grey">
                                        <div className='col-auto d-flex'>
                                            <img src={ele.image} height="50px" width='50px' alt='iceCream' className='border border-grey rounded' />
                                            <div className='mx-3'>
                                                <h6>{ele.name}</h6>
                                                <span>₹ {parseFloat(ele.price * ele.quantity).toFixed(2)}</span>
                                            </div>

                                        </div>
                                        <div className=' btn-group col-md-3'>
                                            <div className='my-2'>
                                                <Button color="primary" variant='outline-primary' onClick={() => dispatch(decreaseQuantity({ id: ele.id, price: ele.price }))}>-</Button>
                                            </div>
                                            <div className='m-2 mt-3'>{ele.quantity}</div>
                                            <div className='my-2'>
                                                <Button color="primary" variant='outline-primary' disabled={ele.disable} onClick={() => dispatch(increaseQuantity({ id: ele.id, price: ele.price }))}>+</Button>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                            ))
                            }
                            <div className='checkout '>
                                <div className='row bg-light' style={{ marginLeft: "1px" }}>
                                    <h3 className='mx-3 my-2 col-auto'>Price Total:₹ {parseFloat(total).toFixed(2)
                                    }</h3>
                                    <Link to='/checkout' className='mx-3 my-2 btn btn-primary col-auto' onClick={() => toggleCart()}>Proceed to Buy</Link>
                                </div>
                            </div>

                        </div>
                }
            </div>
        </>
    )
}

export default CartSidebar
