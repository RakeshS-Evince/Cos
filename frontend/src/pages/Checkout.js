import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCart } from '../feature/cartSlice'
function Checkout() {
    const items = useSelector(selectCart);
    const total = useSelector(state => state.cart.total)
    const [discount, setDiscount] = useState(60);
    const shippingCost = 40;
    return (
        <div className="row">
            <div className="col-xl-8 col-lg-8 mb-4">
                <div className="card shadow-0 border">
                    <div className="p-4">
                        <h5 className="card-title mb-3">Guest checkout</h5>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <p className="mb-0">First name</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" placeholder="Type here" className="form-control" />
                                </div>
                            </div>

                            <div className="col-6">
                                <p className="mb-0">Last name</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" placeholder="Type here" className="form-control" />
                                </div>
                            </div>

                            <div className="col-6 mb-3">
                                <p className="mb-0">Phone</p>
                                <div className="form-outline">
                                    <input type="tel" id="typePhone" className="form-control" />
                                </div>
                            </div>

                            <div className="col-6 mb-3">
                                <p className="mb-0">Email</p>
                                <div className="form-outline">
                                    <input type="email" id="typeEmail" placeholder="example@gmail.com" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Keep me up to date on news</label>
                        </div>

                        <hr className="my-4" />

                        <h5 className="card-title mb-3">Shipping info</h5>
                        <div className="row">
                            <div className="col-sm-8 mb-3">
                                <p className="mb-0">Address</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" placeholder="Type here" className="form-control" />
                                </div>
                            </div>

                            <div className="col-sm-4 mb-3">
                                <p className="mb-0">City</p>
                                <select className="form-select">
                                    <option value="1">New York</option>
                                    <option value="2">Moscow</option>
                                    <option value="3">Samarqand</option>
                                </select>
                            </div>

                            <div className="col-sm-4 mb-3">
                                <p className="mb-0">House</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" placeholder="Type here" className="form-control" />
                                </div>
                            </div>

                            <div className="col-sm-4 col-6 mb-3">
                                <p className="mb-0">Postal code</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" className="form-control" />
                                </div>
                            </div>

                            <div className="col-sm-4 col-6 mb-3">
                                <p className="mb-0">Zip</p>
                                <div className="form-outline">
                                    <input type="text" id="typeText" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                            <label className="form-check-label" htmlFor="flexCheckDefault1">Save this address</label>
                        </div>
                        <h4 className="mb-3">Payment</h4>
                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="credit">Credit card</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="debit">Debit card</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input id="COD" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="COD">COD</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">Name on card</label>
                                <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback"> Name on card is required </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">Credit card number</label>
                                <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                <div className="invalid-feedback"> Credit card number is required </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">Expiration</label>
                                <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                <div className="invalid-feedback"> Expiration date required </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-cvv">CVV</label>
                                <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                <div className="invalid-feedback"> Security code required </div>
                            </div>
                        </div>
                        <div className="float-end">
                            <button className="btn btn-light border">Cancel</button>
                            <button className="btn btn-success shadow-0 border">Continue</button>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-xl-4 col-lg-4 d-flex justify-content-lg-end" >
                <div className="ms-lg-4 mt-4 mt-lg-0" >
                    <h6 className="mb-3">Summary</h6>
                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2">₹{parseFloat(total).toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Discount:</p>
                        <p className="mb-2 text-danger">- ₹{parseFloat(discount).toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Shipping cost:</p>
                        <p className="mb-2">+ ₹{parseFloat(shippingCost).toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2 fw-bold">₹{parseFloat(total - discount + shippingCost).toFixed(2)}</p>
                    </div>

                    <div className="input-group mt-3 mb-4">
                        <input type="text" className="form-control border" name="" placeholder="Promo code" />
                        <button className="btn btn-light text-primary border">Apply</button>
                    </div>

                    <hr />
                    <h6 className="text-dark my-4">Items in cart</h6>
                    {items.slice(0, 4).map((ele, i) => {
                        return (
                            <div key={i} className="d-flex mb-4">
                                <div className="me-3 position-relative">
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                                        1
                                    </span>
                                    <img alt="ice cream" src={ele.image} style={{ height: "50px", width: "50px" }} className="img-sm rounded border" />
                                </div>
                                <div className="">
                                    <Link to="#" className="nav-link">
                                        {ele.name} <br />
                                        {ele.desc || ""}
                                    </Link>
                                    <div className="price text-muted">Total: ₹{parseFloat(ele.price * ele.quantity).toFixed(2)}</div>
                                </div>
                            </div>
                        )
                    })}
                    {items.length > 4 && `And ${items.length - 4} more ${items.length - 4 === 1 ? "item" : "items"} in the cart`}
                </div>
            </div>
        </div>

    )
}

export default Checkout
