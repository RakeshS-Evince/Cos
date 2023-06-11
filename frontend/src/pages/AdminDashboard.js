import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import useApi from '../axios/useApi'
import { BASE_URL, CONTACT_MESSAGES, DASHBOARD } from '../constants/constant';
import { Link } from 'react-router-dom';


function AdminDashboard() {
    const [state] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 67, 33, 45, 30, 39, 23,]
            }
        ]
    })
    const authApi = useApi()
    const [counts, setCounts] = useState(null);
    const [messages, setMessages] = useState([]);
    const timeConverter = (time) => {
        let timeInMinute = Math.floor((new Date() - new Date(time)) / 60000);
        if (timeInMinute > 60 && timeInMinute < 1440) {
            return Math.floor(timeInMinute / 60) === 1 ? Math.floor(timeInMinute / 60) + ' hour ago' : Math.floor(timeInMinute / 60) + ' hours ago'
        }
        if (timeInMinute > 1440) {
            return Math.floor(timeInMinute / 1440) === 1 ? Math.floor(1) + ' day ago' : Math.floor(timeInMinute / 1440) + ' days ago'
        }
        if (timeInMinute < 1) return Math.floor((new Date() - new Date(time)) / 1000) + ' seconds ago';
        return timeInMinute === 1 ? timeInMinute + ' minute ago' : timeInMinute + " minutes ago"

    }
    useEffect(() => {
        authApi.get(DASHBOARD).then(res => setCounts(res.data)).catch(e => console.log(e.response.data.message));
        authApi.get(CONTACT_MESSAGES).then(res => {
            let reversed = res.data?.reverse();
            setMessages(reversed)
        }).catch(e => e.response.data.message);
    }, [authApi])
    return (
        <div>
            <h3>Dashboard</h3>
            <div className='row g-3'>
                <div className='col-md-6 col-lg-3'>
                    <div className='card bg-info py-3'>
                        <div className='card-body'>
                            <div className="d-flex">
                                <div className={`circle-box lg-box d-inline-block`}>
                                    <i className={""}></i>
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 font-weight-bold">IceCreams</h3>
                                    <small className="">Total:{counts?.iceCreams}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-lg-3'>
                    <div className='card bg-warning py-3'>
                        <div className='card-body'>
                            <div className="d-flex">
                                <div className={`circle-box lg-box d-inline-block `}>
                                    <i className={""}></i>
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 font-weight-bold">Brands</h3>
                                    <small className="">Total:{counts?.brands}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-lg-3'>
                    <div className='card bg-danger py-3'>
                        <div className='card-body'>
                            <div className="d-flex">
                                <div className={`circle-box lg-box d-inline-block `}>
                                    <i className={""}></i>
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 font-weight-bold">Orders Pending</h3>
                                    <small className="">Total:{counts?.pending}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-lg-3'>
                    <div className='card bg-success py-3'>
                        <div className='card-body'>
                            <div className="d-flex">
                                <div className={`circle-box lg-box d-inline-block `}>
                                    <i className={""}></i>
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 font-weight-bold">Order success</h3>
                                    <small className="">Total:{counts?.success}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-between'>
                <div className=' col-lg-7'>
                    <div className='card p-3 mt-5 me-2'>
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="bar"
                        /></div>
                </div>
                <div className='col-lg-5'>
                    <div className='card p-3 mt-5'>
                        <h4>Messages to us</h4>

                        {messages?.slice(0, 5)?.map((ele, i) => (
                            <div key={i}>
                                <div className='d-flex justify-content-between mt-2'>
                                    <div>
                                        <h6>{ele.name}</h6>
                                        <span className='text-muted'>{ele.message}</span>
                                    </div>
                                    <span className='text-small text-muted'>{timeConverter(ele.createdAt)}</span>
                                </div>
                                <hr style={{ marginBottom: "2px" }} />
                            </div>
                        ))}
                        <Link to={'/messages'} className='text-end' style={{ textDecoration: 'none' }}>View more</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard
