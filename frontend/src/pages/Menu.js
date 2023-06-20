import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from "axios";
import { Store } from 'react-notifications-component';
import './home.scss'
import { BASE_URL, ICECREAM, IMAGE_URL } from "../constants/constant"
import { addToCart, addToWishlist } from '../feature/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useFilterHook from '../hooks/useFilterHook';
const filterRecordsArr = data => {
    let arr = [];
    data?.forEach(element => {
        if (element.checked) {
            arr.push(element.name || element.size)
        }
    });
    return arr
}

function Menu() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.cart.wishlist);
    const [data, setData] = useState([]);
    const [range, setRange] = useState();
    const [filterOptions, setFilterOptions] = useState();
    const [selectedFilterOpt, setSelectedFilterOpt] = useState({ brand: [], category: [], price: { from: 0, to: 120 }, sizes: [], viewBy: undefined });
    const filterData = useFilterHook(data, selectedFilterOpt);
    useEffect(() => {
        axios.get(BASE_URL + ICECREAM).then((res) => {
            setData(res?.data?.data);
            setRange({ min: res?.data?.min, max: res?.data?.max })
            setSelectedFilterOpt(prev => ({ ...prev, price: { from: res?.data?.min, to: res?.data?.max } }))
        });
        axios.get(BASE_URL + "filter-options").then(res => {
            setFilterOptions({
                sizes: res?.data?.sizes?.map(ele => ({ ...ele, checked: false })),
                brands: res?.data?.brands?.map(ele => ({ ...ele, checked: false })),
                categories: res?.data?.categories?.map(ele => ({ ...ele, checked: false })),
            })
        }).catch(e => console.log(e));
    }, []);
    useEffect(() => {
        changeSelectedFilterOptions(null, undefined);
    }, [filterOptions])
    const changeSelectedFilterOptions = (price, viewBy) => {
        setSelectedFilterOpt(prev => ({
            brand: filterRecordsArr(filterOptions?.brands),
            category: filterRecordsArr(filterOptions?.categories),
            sizes: filterRecordsArr(filterOptions?.sizes),
            price: !price ? prev.price : price,
            viewBy: !viewBy ? prev.viewBy : viewBy,
        }))
    }
    // const showCart = () => {
    //     document.getElementById('cartSidebar').classList.add('cart_wrapper_show');
    // }
    const clearFilter = () => {
        setFilterOptions({
            sizes: filterOptions?.sizes?.map(ele => ({ ...ele, checked: false })),
            brands: filterOptions?.brands?.map(ele => ({ ...ele, checked: false })),
            categories: filterOptions?.categories?.map(ele => ({ ...ele, checked: false })),
        });
        setSelectedFilterOpt(prev =>
            ({ ...selectedFilterOpt, price: { from: range?.min, to: range?.max } })
        )
    }
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

    const changeFilterOptions = ({ type, element }) => {
        if (type === "categories") {
            let index = filterOptions.categories.findIndex(ele => ele.name === element.name);
            let cat = filterOptions.categories;
            cat[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, categories: cat });
        }
        if (type === "brands") {
            let index = filterOptions.brands.findIndex(ele => ele.name === element.name);
            let brand = filterOptions.brands;
            brand[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, brands: brand });
        }
        if (type === "sizes") {
            let index = filterOptions.sizes.findIndex(ele => ele.size === element.size);
            let size = filterOptions.sizes;
            size[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, sizes: size });
        }
    }
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mb-3'>
                    <h3>Icecreams</h3>
                    <div className='d-flex align-items-center'>
                        <label>Sort: </label>
                        <select className='form-control ms-2' onChange={e => changeSelectedFilterOptions(null, e.target.value)}>
                            <option>Older first</option>
                            <option >Newer first</option>
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
                                {filterOptions?.categories?.map((ele, i) => (
                                    <div className="form-check" key={i}>
                                        <input className="form-check-input" type="checkbox" id={ele.name} checked={ele.checked} name={ele.name} onChange={(e) => { changeFilterOptions({ type: "categories", element: ele }) }} />
                                        <label className="form-check-label" htmlFor={ele.name}>
                                            {ele.name}
                                        </label>
                                    </div>
                                ))}
                                <hr />
                                <h5 className='text-warning'>Brands</h5>
                                {filterOptions?.brands.map((ele, i) => (
                                    <div className="form-check" key={i}>
                                        <input className="form-check-input" type="checkbox" name={ele.name} checked={ele.checked} onChange={(e) => { changeFilterOptions({ type: "brands", element: ele }) }} id={ele.name} />
                                        <label className="form-check-label" htmlFor={ele.name}>
                                            {ele.name}
                                        </label>
                                    </div>
                                ))}
                                <hr />
                                <h5 className='text-success'>Size</h5>
                                {filterOptions?.sizes.map((ele, i) => (
                                    <div className="form-check" key={i}>
                                        <input className="form-check-input" type="checkbox" checked={ele.checked} onChange={(e) => { changeFilterOptions({ type: "sizes", element: ele }) }} id={ele.size} />
                                        <label className="form-check-label" htmlFor={ele.size}>
                                            {ele.size}
                                        </label>
                                    </div>
                                ))}
                                <h5 className='text-success'>Price</h5>
                                <div>
                                    <input type="range" min={range?.min} max={range?.max} className='form-range' onChange={(e) => changeSelectedFilterOptions({ from: 20, to: e.target.value }, undefined)} />
                                    <div className='d-flex justify-content-between'><span>20</span>
                                        <span>120</span>
                                    </div>
                                    <span>Filtered: ₹ {selectedFilterOpt.price.from} to ₹{selectedFilterOpt.price.to}</span>
                                </div>
                                <button className='btn btn-danger mt-5 w-100' onClick={() => clearFilter()}>Clear filter</button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="10">
                        <Row className='g-3'>
                            {filterData().length ? filterData().map((ele, i) => (
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
                                                <i className={`bi bi-heart btn btn${wishlistItems.findIndex(item => item.id === ele.id) >= 0 ? "" : "-outline"}-danger me-2`} onClick={() => {
                                                    dispatch(addToWishlist({
                                                        name: ele.name,
                                                        id: ele.id,
                                                        image: ele.image,
                                                        price: ele.price,
                                                        available: ele.quantity,
                                                        quantity: 1,
                                                    }))
                                                }}></i>
                                                <i className='bi bi-cart-plus btn btn-outline-primary' onClick={() => {
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
            </div>
        </>

    )
}

export default Menu
