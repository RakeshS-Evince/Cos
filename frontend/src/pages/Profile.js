import React, { useEffect, useState } from 'react'

import AccountSection from './AccountSection';
import Address from './Address';
import UserOrderTable from './UserOrderTable';

const initialDisplaySection = { orders: false, account: true, address: false }
function Profile() {
    const [displaySection, setDisplaySection] = useState(initialDisplaySection)
    useEffect(() => {
        document.querySelectorAll('.side-section').forEach(element => {
            element.classList.add('elementToFadeInAndOut');
        });
        setTimeout(() => {
            document.querySelectorAll('.side-section').forEach(element => {
                element.classList.remove('elementToFadeInAndOut');
            });
        }, 1500)
    }, [displaySection]);
    return (
        <div >
            <div className="main-body">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className={`list-group-item ${displaySection?.account && "text-danger"}`} style={{ cursor: 'pointer', fontSize: "1.1rem" }} onClick={() => setDisplaySection({ orders: false, account: true, address: false })}>
                                        <i className='bi bi-person-fill me-2'></i>My Account
                                    </li>
                                    <li className={`list-group-item ${displaySection?.orders && "text-danger"} `} style={{ cursor: 'pointer', fontSize: "1.1rem" }} onClick={() => setDisplaySection({ orders: true, account: false, address: false })}>
                                        <i className='bi bi-basket2-fill me-2'></i>Orders
                                    </li>
                                    <li className={`list-group-item ${displaySection?.address && "text-danger"}`} style={{ cursor: 'pointer', fontSize: "1.1rem" }} onClick={() => setDisplaySection({ orders: false, account: false, address: true })}>
                                        <i className='bi bi-geo-alt-fill me-2'></i>Addresses
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="card side-section" >
                            <div className="card-body">
                                {displaySection?.account && <AccountSection />}
                                {displaySection?.address && <Address />}
                                {displaySection?.orders && <UserOrderTable />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
