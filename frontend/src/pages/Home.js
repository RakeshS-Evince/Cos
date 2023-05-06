import React, { useEffect } from 'react'
import './home.scss'
import ImageSlide from './Carousel'

function Home() {
    useEffect(() => {
        document.getElementById('layout').style.padding = '56px 0 0 0';
        return () => {
            document.getElementById('layout').style.padding='70px 15px 50px 15px';
        }
    }, [])
    return (
        <>
            <ImageSlide />
        </>
    )
}

export default Home