import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios";
import { BASE_URL, ICECREAM_BY_BRAND } from "../constants/constant"
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
function IceCreamByBrand() {
    const [data, setData] = useState([]);
    const { name } = useParams()
    useEffect(() => {
        axios.get(BASE_URL + ICECREAM_BY_BRAND + name).then((res) => setData(res?.data))
    }, [name])
    return (
        <>
            <div className='d-flex justify-content-between mb-3'>
                <h3>{name} Icecreams</h3>
            </div>
            <Row className='g-3'>
                {data.length ? data.map((ele, i) => (
                    <Col key={i} lg={3} sm={4}>
                        <ProductCard product={ele} />
                    </Col>
                )) : <p>No ice-creams are there</p>}
            </Row>
        </>

    )
}

export default IceCreamByBrand
