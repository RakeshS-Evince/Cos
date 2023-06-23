import React from 'react'
import Card from 'react-bootstrap/Card'
import { IMAGE_URL } from '../constants/constant'

function CategoryComp({ name }) {
    return (
        <Card className='category-card'>
            <Card.Img className='category-image' variant="top" src={IMAGE_URL + name + ".png"} height={"250px"} />
            <button className='btn btn-danger m-3'>{name}</button>
        </Card>
    )
}

export default CategoryComp
