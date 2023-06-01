import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { BASE_URL, BRANDS } from '../constants/constant';
import Swal from 'sweetalert2';
import BrandForm from './BrandForm';

function BrandTable() {
    const [data, setData] = useState([]);
    const authApi = useAuth();
    const [showBrandForm, setShowBrandForm] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [refetchData, setRefetchData] = useState(false)
    useEffect(() => {
        authApi.get(BASE_URL + "brands").then(({ data }) => setData(data)).catch(e => console.log(e.message))
    }, [refetchData, authApi])
    const deleteHandler = (name) => {
        Swal.fire({
            title: 'Do you want to delete this brand?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if (result.isConfirmed) {
                authApi.delete(BASE_URL + BRANDS + "/" + name).then((res) => {
                    Swal.fire(res?.data.message, "", 'success');
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
                <h3>Brands</h3>
                {showBrandForm && <div className='card'>
                    <div className='card-body'><BrandForm prevBrandName={brandName} setShowBrandForm={setShowBrandForm} refetch={toggleRefetchData} setBrandName={setBrandName} /></div>
                </div>}
                <div className='card mt-2'>
                    <div className='card-body'>
                        <button className='btn btn-primary mb-2' onClick={() => setShowBrandForm(true)}>Add</button>
                        <div className='table-responsive'>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length ? data.map((ele, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{ele.name}</td>
                                            <td><img src={BASE_URL + 'images/' + ele.image} height={'40px'} width={'40px'} alt='brand' /></td>
                                            <td>
                                                <button className='btn btn-info me-2' onClick={() => { setShowBrandForm(true); setBrandName(ele.name) }}>Edit</button>
                                                <button className='btn btn-danger' onClick={() => deleteHandler(ele.name)}>Delete</button>
                                            </td>
                                        </tr>
                                    )) : <tr><td>No brands found</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandTable
