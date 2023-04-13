import React from 'react'
import "./cart.scss"
import { useSelector } from 'react-redux'
import { selectCart } from '../feature/cartSlice'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Stack from 'react-bootstrap/esm/ButtonGroup';
import Button from 'react-bootstrap/esm/Button';

function Cart() {
    const items = useSelector(selectCart);
    console.log(items)
    return (
        <div className='cart_wrapper shadow' id="cartSidebar">

            {items.map(ele => (
                <div className="bg-light border d-flex justify-content-between">
                    <img src={ele.image} height="20px" width='20px' alt='iceCream' />
                    <h5>{`${ele.name}       ₹ ${(ele.price * ele.quantity)}`}</h5>
                    <ButtonGroup>
                        <Button color="primary" >-</Button>
                        <Button color="primary" variant='outline-primary'>{ele.quantity}</Button>
                        <Button color="primary" >+</Button>
                    </ButtonGroup>
                </div>
            ))}

        </div>
    )
}

export default Cart
