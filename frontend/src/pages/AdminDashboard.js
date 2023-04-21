import React, { useState } from 'react';
import Chart from "react-apexcharts";


function AdminDashboard() {
    const [state, setState] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    })
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
                                    <small className="">Total:10</small>
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
                                    <small className="">Total:20</small>
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
                                    <small className="">Total:30</small>
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
                                    <small className="">Total:40</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card p-3 mt-5 col-lg-9'>
                <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                />
            </div>
        </div>
    )
}

export default AdminDashboard
