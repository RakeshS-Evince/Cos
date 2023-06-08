import React from 'react'
import { Link, useParams } from 'react-router-dom'
import payment_failed from "../assets/images/payment_failed.png"
function PaymentFailure() {
    const { id } = useParams();
    return (
        <>
            {!(id === "undefined" || id.length !== 15) ? <div className='d-flex justify-content-center align-item-center'>
                <div>
                    <center><img src={payment_failed} alt="payment" height="400px" width='400px' className='img-fluid' /></center>
                    <h1 className='text-danger text-center mb-5'>Purchase failed</h1>
                    <p> Your purchase has been failed due to some reason, you can retry the <Link to={"/my-orders/" + id}>retry the payment here</Link>.<br />
                    </p>
                    <Link to="/" className='btn btn-primary'>Back to home</Link>
                </div>
            </div> : <>
                Bad request<br /> <Link to="/">Back to home</Link>
            </>}
        </>
    )
}

export default PaymentFailure
