import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FullLayout from '../layout/FullLayout'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'

function Router() {
    return (
        <Routes>
            <Route element={<FullLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" exact element={<Checkout />} />
            </Route>
        </Routes>
    )
}

export default Router
