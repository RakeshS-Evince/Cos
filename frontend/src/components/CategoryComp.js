import React from 'react'
import Card from 'react-bootstrap/Card'
import { IMAGE_URL } from '../constants/constant'

function CategoryComp({ name }) {
    return (
        <Card className='cat-card'>
            <Card.Img className='' variant="top" src={IMAGE_URL + name + ".png"} height={"250px"} alt="category" />
            <button className='btn btn-danger m-3'>{name}</button>
        </Card>
    )
}

export default CategoryComp
