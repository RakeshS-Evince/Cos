import React, { useEffect, useState } from 'react'
import { BASE_URL, BRANDS, IMAGE_URL } from "../constants/constant"
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from "axios";
function Brands() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + BRANDS).then((res) => setData(res?.data))
    }, [])
    return (
        <>
            <h3>All Brands</h3>
            <Row className='g-3'>
                {data.length ? data.map((ele, i) => (
                    <Col key={i} lg={3} sm={4}>
                        <Card>
                            <Card.Img variant="top" src={IMAGE_URL + ele.image} height={"250px"} />
                            <Card.Body>
                                <Card.Title><Link to={"/brands/" + ele.name} style={{ textDecoration: "none" }}>{ele.name}</Link> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : <p>No brands are there</p>}
            </Row>
        </>

    )
}

export default Brands
