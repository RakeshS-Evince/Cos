import React, { useEffect, useState } from 'react'
import { authApi } from '../axios/axios';
import { BASE_URL, BRANDS } from '../constants/constant';
import Swal from 'sweetalert2';

function BrandForm({ setShowBrandForm, prevBrandName, refetch, ...rest }) {
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState(null)
    useEffect(() => {
        setBrandName(prevBrandName);
    }, [prevBrandName])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!brandName) return alert('Please enter brand name');
        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('image', brandImage);
        if (prevBrandName) {
            authApi.put(BASE_URL + BRANDS + "/" + prevBrandName, formData).then(({ data }) => {
                Swal.fire(data.message);
                rest.setBrandName();
                setShowBrandForm(false);
                refetch()
            }).catch((e) => {
                console.log(e.message)
            })
            return
        }
        authApi.post(BASE_URL + BRANDS, formData).then((res) => {
            res && Swal.fire(res.data.message);
            setShowBrandForm(false);
            rest.setBrandName();
            refetch()
        }).catch((e) => {
            console.log(e.message)
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <label htmlFor='brandName' >Brand Name</label>
                <input id='brandName' className='form-control' placeholder='Enter brand name' value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                <label htmlFor='brandName' >Brand Image</label>
                <input id='image' type='file' className='form-control' onChange={(e) => setBrandImage(e.target.files[0])} />
                <small className='text-muted'>Make sure you haven't added this brand before</small><br />
                <button className='btn btn-primary mt-2' type='submit'>Save</button>
            </form>
        </>
    )
}

export default BrandForm
