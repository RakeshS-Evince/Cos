import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <>
    <h1>Unauthorized Request</h1>
    <Link className='btn btn-primary mt-2' to="/">Back to home</Link></>
  )
}

export default Unauthorized