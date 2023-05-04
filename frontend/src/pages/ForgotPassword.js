import { useState } from "react"
import useAuth from "../axios/useApi";
import { BASE_URL } from "../constants/constant";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const authApi = useAuth()
    const sendOtp = () => {
        authApi.post(BASE_URL + 'auth/forgot-password', { email: email }).then((res) => {
            Swal.fire(res.data.message,'','info')
        }).catch(e => console.log(e))
    }
    return (
    <div className="card">
            <div className="card-body p-5">
                <h3>Forgot Password</h3>
                <p className="">Enter your email address associated with your account. We'll send you a link to reset your password</p>
                <input className="form-control my-2" id="email" placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary" onClick={sendOtp}>Continue</button>
                
            </div>
        </div>
        
    )
}
export default ForgotPassword