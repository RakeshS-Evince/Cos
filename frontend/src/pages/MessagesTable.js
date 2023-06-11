import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { CONTACT_MESSAGES } from '../constants/constant';
function MessagesTable() {
    const [messages, setMessages] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(CONTACT_MESSAGES).then((res) => {
            let reversed = res.data?.reverse();
            setMessages(reversed)
        }).catch(e => e.response.data.message);
    }, [authApi])
    return (
        <div>
            <div className='card table-responsive'>
                <div className='card-body'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages?.map((ele, i) => (
                                <>
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.message}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MessagesTable