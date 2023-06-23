import React, { useEffect, useState } from 'react'
import { ORDERS, ORDER_STATUS_UPDATE } from '../../constants/constant';
import Swal from 'sweetalert2';
import OrderDetailsModal from './OrderDetailsModal';
import useAuth from '../../axios/useApi';

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState();
    const [status, setStatus] = useState('')
    const [enableInput, setEnableInput] = useState(false);
    const [refetch, setRefetch] = useState(false)
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(ORDERS).then(res => setOrders(res.data?.reverse())).catch(e => console.log(e.response.data.message));
    }, [refetch, authApi]);

    const toggleRefetch = () => { setRefetch(!refetch) }
    const changeStatus = () => {
        if (status === 'Select status' || !status) {
            alert("Please select one status")
        } else {
            authApi.put(ORDER_STATUS_UPDATE + id, { status: status }).then(res => {
                Swal.fire(res.data.message);
                setStatus('');
                setId('');
                setEnableInput(false)
                toggleRefetch()
            }).catch(e => { console.log(e.response.data.message) })
        }

    }
    return (
        <div>
            <h3>
                Orders
            </h3>
            <OrderDetailsModal id={id} setId={setId} />
            {enableInput && <div className='card mb-2'>
                <div className='card-body'>
                    <div>
                        <h5>Select status for order {id}</h5>
                        <div >
                            <select className='form-select' id='status' value={status} onChange={e => setStatus(e.target.value)}>
                                <option>Select status</option>
                                <option>Confirmed</option>
                                <option>Canceled</option>
                                <option>Delivered</option>
                            </select>
                            <button className='btn btn-success me-2 mt-3' onClick={() => changeStatus()}>Save</button>
                            <button className='btn btn-danger mt-3' onClick={() => setEnableInput(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Placed By</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((ele, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{ele.id}</td>
                                        <td>{ele.customer.fullname || ele.username}</td>
                                        <td>{ele.status}</td>
                                        <td>{ele.date}</td>
                                        <td>₹ {parseFloat(ele.totalPrice).toFixed(2)}</td>
                                        <td>
                                            <button className='btn btn-info me-2' onClick={() => { setId(ele.id); }} data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                                            <button className='btn btn-success' onClick={() => { setId(ele.id); setEnableInput(true) }}>Change Status</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTable
