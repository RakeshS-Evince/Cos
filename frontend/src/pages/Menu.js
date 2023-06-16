import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from "axios";
import './home.scss'
import { BASE_URL, ICECREAM, IMAGE_URL } from "../constants/constant"
import { addToCart, addToWishlist } from '../feature/cartSlice'
import { useDispatch } from 'react-redux'
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import RangeSlider from '../components/multiRangeSlider/RangeSlider';

function Menu() {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const [filterOptions, setFilterOptions] = useState(null)
    const navigate = useNavigate();
    const showCart = () => {
        document.getElementById('cartSidebar').classList.add('cart_wrapper_show');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(BASE_URL + ICECREAM).then((res) => setData(res?.data));
        axios.get(BASE_URL + "filter-options").then(res => { setFilterOptions(res.data) }).catch(e => console.log(e));

    }, [])
    const cartClickHandler = (data) => {
        if (!user?.isLoggedIn) {
            Swal.fire('You are not logged in please login and add items to cart');
            return
        }
        showCart();
        dispatch(addToCart(data))
    }

    return (
        <>
            <div className='d-flex justify-content-between mb-3'>
                <h3>Icecreams</h3>
                <div className='d-flex align-items-center'>
                    <label>View: </label>
                    <select className='form-control ms-2' >
                        <option >Newer first</option>
                        <option>Older first</option>
                        <option>Price Low to High</option>
                        <option>Price High to Low</option>
                    </select>
                </div>
            </div>
            <Row className='g-3 justify-content-between'>
                <Col md="2">
                    <Card>
                        <Card.Header>Filter</Card.Header>
                        <Card.Body>
                            <h5 className='text-info'>Category</h5>
                            {filterOptions?.categories.map((ele, i) => (
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id={ele.name} />
                                    <label className="form-check-label" for={ele.name}>
                                        {ele.name}
                                    </label>
                                </div>
                            ))}
                            <hr />
                            <h5 className='text-warning'>Brands</h5>
                            {filterOptions?.brands.map((ele, i) => (
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id={ele.name} />
                                    <label className="form-check-label" for={ele.name}>
                                        {ele.name}
                                    </label>
                                </div>
                            ))}
                            <hr />
                            <h5 className='text-success'>Size</h5>
                            {filterOptions?.sizes.map((ele, i) => (
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id={ele.size} />
                                    <label className="form-check-label" for={ele.size}>
                                        {ele.size}
                                    </label>
                                </div>
                            ))}
                            <h5 className='text-success'>Price</h5>
                            <RangeSlider min={0} max={1000} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)} />
                            <button className='btn btn-danger mt-5 w-100'>Filter</button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="10">
                    <Row className='g-3'>
                        {data.length ? data.map((ele, i) => (
                            <Col key={i} lg={3} sm={4}>
                                <Card className='menu-card'>
                                    <Card.Img className='menu-image' onClick={() => navigate('/icecream-details/' + ele.id)} variant="top" src={IMAGE_URL + ele.image} height={"250px"} />
                                    <Card.Body>
                                        <Card.Title className='menu-title' onClick={() => navigate('/icecream-details/' + ele.id)}>{ele.name}</Card.Title>
                                        <Card.Text>
                                            {ele.description}
                                        </Card.Text>
                                        <span className='mt-2'>Price: ₹{parseFloat(ele.price).toFixed(2)}</span>
                                        <div className='d-flex justify-content-end'>
                                            <i className='bi bi-heart btn btn-danger me-2' onClick={() => {
                                                dispatch(addToWishlist({
                                                    name: ele.name,
                                                    id: ele.id,
                                                    image: ele.image,
                                                    price: ele.price,
                                                    available: ele.quantity,
                                                    quantity: 1,
                                                })); Swal.fire("Item added to your wishlist!", "", "success")
                                            }}></i>
                                            <i className='bi bi-cart-plus btn btn-primary' onClick={() => {
                                                cartClickHandler({
                                                    name: ele.name,
                                                    id: ele.id,
                                                    image: ele.image,
                                                    price: ele.price,
                                                    available: ele.quantity,
                                                    quantity: 1,
                                                })
                                            }}>
                                            </i>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) : <p>No ice-creams are there</p>}
                    </Row>
                </Col>
            </Row>
        </>

    )
}

export default Menu
