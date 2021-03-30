/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState} from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductListItems from './viewproduct'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/rating'
import { RatingAvg } from "../../function/rating"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { addToWishlist } from "../../function/user"
import _ from "lodash"

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStartClick, star }) => {
    const { title, images, description, _id } = product;

    const { user } = useSelector((state) => ({...state}))

    const  dispatch  = useDispatch()
    

    const [tooltip, setTooltip] = useState("Click to add");

    let history = useHistory();

    const handleWishlistAdd = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
            .then((res) =>{
                console.log("addtoWishlist>>>>", res.data)
                toast.success("Added to wishlist");
                history.push("/user/wishlist");
            })
    }

    const handleCart = () => {

        let cart = []
        if(typeof windows !== undefined) {
            // if there is a cart in local storage we will GET it 
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            // push new item to cart array
            cart.push({
                ...product,
                count:1,
            });
            // we are removiing duplicates with loadash 
            let unique = _.uniqWith(cart, _.isEqual)
            // console.log("unique------>", unique)
            // i m saving data in local storage in json format
            localStorage.setItem("cart", JSON.stringify(unique))
            setTooltip("Added");

            // ading product to cart using state
            dispatch({
                type:" ADD_TO_CART",
                payload: cart 
            })
            dispatch({
                type: "CART_SIDE_VIEW",
                payload: true,
            });
            
        }
    }
    return (
        <>
        <div className="col-md-7 bg-light">
            <Carousel showArrows={true} autoPlay infiniteLoop>
                {images && images.map((i)=> <img src = {i.url} key = {i.public_id} alt = {i.title}/>)}
            </Carousel>
            <Tabs type="card">
                <TabPane tab="Description" key="1">
                        {description && description}
                </TabPane>
                <TabPane tab="More" key="2">
                        Call use on xxxx xxx xxx to learn more about this product.
                </TabPane>
            </Tabs>
        </div>

        <div className="col-md-5">
            <h2 className="bg-info p-3">{title}</h2>
            {product && product.ratings && product.ratings.length > 0 ? RatingAvg(product)  : 
                <div className="text-center pt-1 pb-3">
                        NO RATING YET
                </div> 
            }

            <Card
                actions={[
                    <Tooltip title={tooltip}>
                        <a onClick={handleCart}>
                            <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                            Cart
                        </a>
                    </Tooltip>,

                    <a onClick = {handleWishlistAdd}>
                        <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                    </a>,

                    <RatingModal>
                        <StarRatings
                            name ={_id}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            isSelectable = {true}
                            rating = {star}
                            changeRating = {onStartClick}

                        />
                    </RatingModal>
                ]}
                >
                <ProductListItems product={product} />
            </Card>
        </div>
        </>
    );
};

export default SingleProduct;
