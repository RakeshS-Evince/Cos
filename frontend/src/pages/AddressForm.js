import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ADDRESS, BASE_URL } from '../constants/constant';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../axios/useApi';
const intitalAddress = { firstname: "", lastname: "", phone: "", email: "", address: "", state: "", city: "", zip: "" }
function AddressForm() {
    const authApi = useAuth();
    const [address, setAddress] = useState(intitalAddress);
    const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            authApi.get(ADDRESS + id).then(({ data }) => setAddress(data));
        }
        axios.get(BASE_URL + 'states').then(({ data }) => setStates(data));
    }, [id, authApi]);
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            Swal.fire("Please fill all the required fields", "", "info")
            return
        }
        if (!id) {
            authApi.post(ADDRESS, { ...address, default: true })
                .then(res => {
                    Swal.fire(res.data.message);
                    setAddress(intitalAddress)
                    navigate('/profile')
                })
                .catch(e => console.log(e.respones.data.message));

            return
        }
        authApi.put(ADDRESS + id, address)
            .then(res => {
                Swal.fire(res.data.message);
                setAddress(intitalAddress);
                navigate('/profile');
            })
            .catch(e => console.log(e.respones.data.message))
    }
    return (
        <div className='card mt-2 p-3'>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row">
                    <div className="col-6 mb-3">
                        <p className="mb-0">First name</p>
                        <div className="form-outline">
                            <input type="text" id="typeText" placeholder="Type here" className="form-control" value={address?.firstname} onChange={e => setAddress({ ...address, firstname: e.target.value })} required />
                        </div>
                    </div>
                    <div className="col-6">
                        <p className="mb-0">Last name</p>
                        <div className="form-outline">
                            <input type="text" id="typeText" placeholder="Type here" value={address?.lastname} className="form-control" onChange={e => setAddress({ ...address, lastname: e.target.value })} required />
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="mb-0">Phone</p>
                        <div className="form-outline">
                            <input type="tel" id="typePhone" value={address?.phone} className="form-control" onChange={e => setAddress({ ...address, phone: e.target.value })} required />
                        </div>
                    </div>

                    <div className="col-6 mb-3">
                        <p className="mb-0">Email</p>
                        <div className="form-outline">
                            <input type="email" id="typeEmail" placeholder="example@gmail.com" value={address?.email} className="form-control" onChange={e => setAddress({ ...address, email: e.target.value })} required />
                        </div>
                    </div>
                </div>
                <hr className="my-4" />

                <h5 className="card-title mb-3">Shipping info</h5>
                <div className="row">
                    <div className="col-sm-8 mb-3">
                        <p className="mb-0">Address</p>
                        <div className="form-outline">
                            <input type="text" id="typeText" placeholder="Type here" value={address?.address} className="form-control" onChange={e => setAddress({ ...address, address: e.target.value })} required />
                        </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                        <p className="mb-0">States</p>
                        <select className="form-select" value={address?.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required>
                            <option></option>
                            {Object.keys(states)?.map((ele, i) => (
                                <option key={i}>{ele}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="mb-0">City</p>
                        <select className="form-select" value={address?.city} onChange={e => setAddress({ ...address, city: e.target.value })} required>
                            <option ></option>
                            {states[address?.state]?.map((ele, i) => (
                                <option key={i}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-4 mb-3">
                        <p className="mb-0">House</p>
                        <div className="form-outline">
                            <input type="text" id="typeText" value={address?.house} placeholder="Type here" className="form-control" onChange={e => setAddress({ ...address, house: e.target.value })} required />
                        </div>
                    </div>


                    <div className="col-sm-4 col-6 mb-3">
                        <p className="mb-0">Zip</p>
                        <div className="form-outline">
                            <input type="text" id="typeText" value={address?.zip} className="form-control" onChange={e => setAddress({ ...address, zip: e.target.value })} required />
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit' className='me-2 btn btn-primary'>Save</button>
                    <Link to="/profile" className='me-2 btn btn-danger'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddressForm