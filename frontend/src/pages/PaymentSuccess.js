import React from 'react'
import { Link, useParams } from 'react-router-dom'
import payment from '../assets/images/payment.png'
function PaymentSuccess() {
    const { id } = useParams();
    return (
        <>
            {!(id === "undefined" || id.length !== 15) ? <div className='d-flex justify-content-center align-item-center'>
                <div>
                    <center><img src={payment} alt="payment" height="400px" width='400px' className='img-fluid' /></center>
                    <h1 className='text-success text-center mb-5'>Purchase Completed</h1>
                    <p> Your purchase has been successful, you can see the <Link to={"/my-orders/" + id}>details of your purchase here</Link>.<br />
                        We have sent the confirmation of your purchase to the email registered in your account.
                    </p>
                    <Link to="/" className='btn btn-primary'>Back to home</Link>
                </div>
            </div> : <>
                Bad request<br /> <Link to="/">Back to home</Link>
            </>}
        </>

    )
}

export default PaymentSuccess
