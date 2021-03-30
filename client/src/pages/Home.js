import React from "react";
import NewArrivals from "../components/home/newArrivals"
import BestSellers from "../components/home/bestArrivals"
import Footer from "../components/footer"
import Banner from "../components/Banners"

import Jumbotron from "../components/card/Jumborton"
// import LoadingCard from "../components/card/loadingcars"

const Home = () => {


    return (
        <>
            <Banner />
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Products"]} />
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Arrivals
            </h4>
            <NewArrivals />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Best Sellers
            </h4>
            <BestSellers />

            <Footer />
        
            
            </>
    );
};

export default Home;
