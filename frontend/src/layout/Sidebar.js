import React from 'react'
import './sidebar.scss'

import { Link } from 'react-router-dom'
import useRoleCheck from '../hooks/useRoleCheck'
function Sidebar() {
    const { isStaff } = useRoleCheck();
    const displayLink = () => {
        document.getElementById('sidebar').classList.add('sidebar_wrapper_show_link');
    }
    const hideLink = () => {
        document.getElementById('sidebar').classList.remove('sidebar_wrapper_show_link');
    }
    return (
        <div className='sidebar_wrapper sidebar_wrapper_show shadow' id='sidebar' >
            <div className='d-flex'>
                <ul onMouseEnter={displayLink} onMouseLeave={hideLink}>
                    <li><i className="bi bi-speedometer2 " ></i></li>
                    <li>
                        <i className="bi bi-truck "></i>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className='' enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /></g><g><path d="M8.79,12.4l3.26,6.22l3.17-6.21c-0.11-0.08-0.21-0.16-0.3-0.25 C14.08,12.69,13.07,13,12,13s-2.08-0.31-2.92-0.84C8.99,12.25,8.89,12.33,8.79,12.4z M6.83,12.99C5.25,12.9,4,11.6,4,10 c0-1.49,1.09-2.73,2.52-2.96C6.75,4.22,9.12,2,12,2s5.25,2.22,5.48,5.04C18.91,7.27,20,8.51,20,10c0,1.59-1.24,2.9-2.81,2.99 L12.07,23L6.83,12.99z" fillRule="evenodd" /></g></svg>
                    </li>
                    <li>
                        <svg className='' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-9v-6h9v6z" /></svg>
                    </li>
                    {!isStaff && <>
                        <li>
                            <i className="bi bi-people "></i>
                        </li>
                        <li>
                            <i className="bi bi-people "></i>
                        </li>
                        <li>
                            <i className="bi bi-people "></i>
                        </li>
                    </>}

                </ul>
                <ul onMouseEnter={displayLink} onMouseLeave={hideLink}>
                    <li><Link to="/">Dashboard</Link></li>
                    <li>
                        <Link to="/orders-table">Orders</Link>
                    </li>
                    <li>
                        <Link to="/ice-creams-table">Icecreams</Link>
                    </li>
                    <li>
                        <Link to="/brands-table">Brands</Link>
                    </li>

                    {!isStaff && <>
                        <li>
                            <Link to="/Customers">Customers</Link>
                        </li>
                        <li>
                            <Link to="/staff">Staff</Link>
                        </li>
                        <li>
                            <Link to="/reviews">Reviews</Link>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    )
}
export default Sidebar
