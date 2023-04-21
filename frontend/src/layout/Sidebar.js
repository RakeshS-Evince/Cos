import React from 'react'
import './sidebar.scss'
import { Link } from 'react-router-dom'
function sideBar() {
    return (
        <div className='sidebar_wrapper sidebar_wrapper_show' id='sidebar' >
            <div>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/orders-table">Orders</Link></li>
                    <li><Link to="/ice-creams-table">Icecreams</Link></li>
                    <li><Link to="/brands-table">Brands</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default sideBar
