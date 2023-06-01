import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { REVIEWS } from '../constants/constant';


function ReviewsTable() {
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({ name: "", title: "", description: "" })
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
                                <th scope="col">IceCream Name</th>
                                <th scope="col">Reviewed By</th>
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
                                    <td>{ele.iceCream?.name}</td>
                                    <td>{ele.customer?.fullname}</td>
                                    <td>{ele.rating}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.description ? ele.description?.slice(0, 50) + '...' : ''}</td>
                                    <td>
                                        <button className='btn btn-info me-2' onClick={() => { setReview({ name: ele?.customer?.fullname, title: ele.title, description: ele.description }) }} data-bs-toggle="modal" data-bs-target="#reviewModal">View More</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{review?.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h5>{review?.title}</h5>
                                    <p>{review?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsTable
