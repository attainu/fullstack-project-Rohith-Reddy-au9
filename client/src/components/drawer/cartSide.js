import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const { sideDraw, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: "100%",
        height: "50px",
        objectFit: "cover",
    };

    return <Drawer 
                className="text-center"
                visible={sideDraw} 
                title={`CART / ${cart.length} Products `}
                closable = {false}
                onClose={() => {
                    dispatch({
                    type: "CART_SIDE_VIEW",
                    payload: false,
                    });
                }}
            >
                {cart.map((p)=>(
                    <div key={p._id} className="row">
                        <div className="col">
                            {p.images[0] ? (<>
                                <img src={p.images[0].url} style={imageStyle} alt={p.title} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>) : (
                                <>
                                    <h6>No Image sorry</h6>
                                    <p className="text-center bg-secondary text-light">
                                        {p.title} x {p.count}
                                    </p>
                                </>
                            )}
                            
                        </div>
                    </div>
                ))}

                <Link to="/cart">
                    <button
                        onClick={() =>
                            dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                            })
                        }
                        className="text-center btn btn-primary btn-raised btn-block"
                        >
                            Go To Cart
                    </button>
                </Link>
            </Drawer>;
};

export default SideDrawer;
