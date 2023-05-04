import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import useApi from '../axios/useApi'
import { BASE_URL } from '../constants/constant';


function AdminDashboard() {
    const [state, setState] = useState({
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
    const [counts, setCounts] = useState(null)
    useEffect(() => {
        authApi.get(BASE_URL + "dashboard").then(res => setCounts(res.data)).catch(e => console.log(e.response.data.message))
    }, [])
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
                    {/* <div className='card p-3 mt-5'>
                        <h5>Logs</h5>
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard
