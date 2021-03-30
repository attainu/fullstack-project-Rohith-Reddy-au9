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
            {/* <a className="carousel-control-prev"  role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a> */}
            </div>
        </>
    )
}

export default Banner