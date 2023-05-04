import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
    <h1>404 page no found</h1>
    <Link to="/">Back to home</Link></>
  )
}

export default NotFound