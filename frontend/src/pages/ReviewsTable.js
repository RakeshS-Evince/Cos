import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { REVIEWS } from '../constants/constant';


function ReviewsTable() {
    const [reviews, setReviews] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(REVIEWS).then(res => setReviews(res.data)).catch(e => console.log(e.response.data.message));
    }, [authApi]);

    return (
        <div>
            <h3>
                Reviews
            </h3>
            <div className='card'>
                <div className='card-body'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FullName</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.map((ele, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{ele.customer?.fullname}</td>
                                    <td>{ele.rating}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.description}</td>
                                    <td>
                                        <button className='btn btn-info me-2' onClick={() => { }}>View More</button>
                                        <button className='btn btn-success' onClick={() => { }}>Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReviewsTable
