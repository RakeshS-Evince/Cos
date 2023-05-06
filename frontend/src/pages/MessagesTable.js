import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { BASE_URL } from '../constants/constant';
function MessagesTable() {
    const [messages, setMessages] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(BASE_URL + 'messages').then(res => setMessages(res.data)).catch(e => e.response.data.message);
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