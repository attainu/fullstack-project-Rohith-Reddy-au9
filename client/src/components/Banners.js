/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Sale from '../Image/Banner2.jpg'


const Banner = () => {
    return(
        <>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img className="d-block w-100" src={Sale} alt="First slide" />
                </div>
                
            </div> 
         </div>
        </>
    )
}

export default Banner
