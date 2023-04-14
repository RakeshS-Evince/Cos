import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from "axios";
import { BASE_URL, ICECREAM } from "../constants/constant"
import { addToCart } from '../feature/cartSlice'
import { useDispatch } from 'react-redux'
function Home() {
    const [data, setData] = useState([]);
    const showCart = () => {
        document.getElementById('cartSidebar').classList.add('cart_wrapper_show');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(BASE_URL + ICECREAM).then((res) => setData(res?.data)).catch(e => console.log(e))
    }, [])
    return (
        <>
            <h1>All Icecreams</h1>
            <Row className='g-3'>
                {data.length && data.map((ele, i) => (
                    <Col key={i} lg={3} sm={4}>
                        <Card>
                            <Card.Img variant="top" src={ele.image + "/100px180"} />
                            <Card.Body>
                                <Card.Title>{ele.name}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <span className='mt-2'>Price: ₹{parseFloat(ele.price).toFixed(2)}</span>
                                <div className='d-flex justify-content-end'>
                                    <i className='bi bi-cart-plus btn btn-primary' onClick={() => {
                                        showCart();
                                        dispatch(addToCart({
                                            name: ele.name,
                                            id: ele.id,
                                            image: ele.image,
                                            price: ele.price,
                                            available: ele.quantity,
                                            quantity: 1,
                                        }))
                                    }}>
                                    </i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>

    )
}

export default Home
