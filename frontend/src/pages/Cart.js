import React from 'react'
import { IMAGE_URL } from '../constants/constant';
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, selectCart, removeFromCart, addToWishlist } from '../feature/cartSlice'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function Cart() {
    const wishlistItems = useSelector(state => state.cart.wishlist)
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
    return (
        <div>
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {items.length} {items.length === 1 ? "item" : "items"}</h5>
                                </div>
                                {items.length ? <>
                                    <div className="card-body">
                                        {items?.map((ele, i) => (
                                            <div className="row" key={i}>
                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                    <div
                                                        className="bg-image hover-overlay hover-zoom ripple rounded"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        <img
                                                            src={IMAGE_URL + ele.image}
                                                            className="w-100"
                                                            alt="Blue Jeans Jacket"
                                                        />
                                                        <a href="#!">
                                                            <div
                                                                className="mask"
                                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                    <div className='d-flex'><strong>{ele.name}</strong><span className='text-muted ms-1 mt-1' style={{ fontSize: "12px" }}>{`(${ele.size?.size ? ele.size?.size : "Regular"})`}</span></div>
                                                    <p>Price: {ele.price}</p>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm me-1 mb-2"
                                                        data-mdb-toggle="tooltip"
                                                        onClick={() => deleteHandler(ele)}
                                                        title="Remove item"
                                                    >
                                                        <i className="fas fa-trash" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm mb-2"
                                                        data-mdb-toggle="tooltip"
                                                        onClick={() => dispatch(addToWishlist({
                                                            name: ele.name,
                                                            id: ele.id,
                                                            image: ele.image,
                                                            price: ele.price,
                                                            available: ele.quantity,
                                                            quantity: 1,
                                                            size: ele.size
                                                        }))}
                                                        title="Move to the wish list"
                                                    >
                                                        <i className={`text-white bi bi-${wishlistItems.findIndex(item => item.id === ele.id) >= 0 ? "heart-fill" : "heart"}`} />
                                                    </button>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                                        <button
                                                            className="btn btn-primary px-3 me-2"
                                                            onClick={() => dispatch(decreaseQuantity({ id: ele.id, price: ele.price, size: ele.size }))}
                                                        >
                                                            <i className="fas fa-minus" />
                                                        </button>
                                                        <div className="form-outline">
                                                            <input
                                                                id="form1"
                                                                min={0}
                                                                name="quantity"
                                                                defaultValue={1}
                                                                type="number"
                                                                value={ele.quantity}
                                                                className="form-control"
                                                            />
                                                            <label className="form-label" htmlFor="form1">
                                                                Quantity
                                                            </label>
                                                        </div>
                                                        <button
                                                            disabled={ele.disable}
                                                            className="btn btn-primary px-3 ms-2"
                                                            onClick={() => dispatch(increaseQuantity({ id: ele.id, price: ele.price, size: ele.size }))}
                                                        >
                                                            <i className="fas fa-plus" />
                                                        </button>
                                                    </div>
                                                    <p className="text-start text-md-center">
                                                        <strong>₹ {parseFloat(ele.price * ele.quantity).toFixed(2)}</strong>
                                                    </p>
                                                </div>
                                                <hr className="my-2" />
                                            </div>
                                        ))}
                                    </div>
                                </> : <div className='m-3'>
                                    <h3>No items added in the cart</h3>
                                    <Link to="/menu" className='btn btn-primary'>Goto shop</Link>
                                </div>}

                            </div>
                        </div>
                        {items.length ? <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>₹{parseFloat(total)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>₹40.00</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including shipping)</p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>₹ {total + 40}</strong>
                                            </span>
                                        </li>
                                    </ul>
                                    <Link to={"/checkout"} className="btn btn-primary btn-lg btn-block">
                                        Go to checkout
                                    </Link>
                                </div>
                            </div>
                        </div> : <></>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart
