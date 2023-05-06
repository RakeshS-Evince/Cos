import React, { useState } from 'react'
import './contact.css'
import useAuth from '../../axios/useApi'
import { BASE_URL } from '../../constants/constant';
import Swal from 'sweetalert2';
function Contact() {
  const [msgData, setMsgData] = useState({
    email: '',
    name: '',
    message: ''
  })
  const authApi = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault()
    if (msgData.email === '' || msgData.name === '' || msgData.message === '') {
      alert('please fill all the fields');
      return
    }
    authApi.post(BASE_URL + 'messages', msgData).then(res => {
      Swal.fire(res.data.message);
      setMsgData({
        email: '',
        name: '',
        message: ''
      })
    }).catch(e => {
      console.log(e.response.message.data)
    })

  }
  return (
    <div>
      <div className="_container">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt" />
              <div className="topic">Address</div>
              <div className="text-one">Sector 27</div>
              <div className="text-two">Pearl Height D-Block , Rourkela</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt" />
              <div className="topic">Phone</div>
              <div className="text-one">+91 9999888822</div>
              <div className="text-two">+91 9999777733</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope" />
              <div className="topic">Email</div>
              <div className="text-one">coderamit97@gmail.com</div>
              <div className="text-two">albertcode14@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any work from me or any types of quries related to my
              tutorial, you can send me message from here. It's my pleasure to help
              you.
            </p>
            <form >
              <div className="input-box">
                <input type="text" placeholder="Enter your name" value={msgData.name} onChange={e => setMsgData({ ...msgData, name: e.target.value })} />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Enter your email" value={msgData.email} onChange={e => setMsgData({ ...msgData, email: e.target.value })} />
              </div>
              <div className="input-box message-box">
                <textarea type="text" placeholder="Enter your message" value={msgData.message} onChange={e => setMsgData({ ...msgData, message: e.target.value })} />
              </div>
              <div className="button">
                <input type="button" defaultValue="Send Now" onClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact