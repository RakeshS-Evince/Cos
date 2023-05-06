import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { BASE_URL } from '../constants/constant';
import { ICECREAM } from '../constants/constant';
import Swal from 'sweetalert2';
import IceCreamForm from './IceCreamForm';

function IceCreamTable() {
    const [data, setData] = useState([]);
    const authApi = useAuth();
    const [showIcecreamForm, setShowIcecreamForm] = useState(false);
    const [iceCreamId, setIceCreamId] = useState('');
    const [refetchData, setRefetchData] = useState(false)
    useEffect(() => {
        authApi.get(BASE_URL + ICECREAM).then(({ data }) => setData(data)).catch(e => console.log(e.message))
    }, [refetchData,authApi])
    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Do you want to delete this Icecream?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if (result.isConfirmed) {
                authApi.delete(BASE_URL + ICECREAM + '/' + id).then((res) => {
                    res && Swal.fire(res?.data.message, "", 'success');
                    toggleRefetchData();
                }).catch(e => {
                    console.log(e.response.data.message)
                })
            }
        })

    }
    const toggleRefetchData = () => {
        setRefetchData(!refetchData)
    }
    return (
        <div>
            <div>
                <h3>
                    Ice-Creams
                </h3>
                {showIcecreamForm ? <IceCreamForm id={iceCreamId} setShowIcecreamForm={setShowIcecreamForm} refetch={toggleRefetchData} setId={setIceCreamId} />
                    : <div className='card'>
                        <div className='card-body'>
                            <button className='btn btn-primary mb-2' onClick={() => setShowIcecreamForm(true)}>Add Ice-Cream</button>
                            <div className="table-responsive">
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((ele, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{ele.name}</td>
                                                <td><img src={BASE_URL + 'images/' + ele.image} height={'40px'} width={'40px'} alt='ice-creams' /></td>
                                                <td>{ele.price}</td>
                                                <td>{ele.quantity}</td>
                                                <td>
                                                    <button className='btn btn-info me-2' onClick={() => { setShowIcecreamForm(true); setIceCreamId(ele.id) }}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => deleteHandler(ele.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default IceCreamTable
