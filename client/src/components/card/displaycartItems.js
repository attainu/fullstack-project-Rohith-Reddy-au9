/* eslint-disable array-callback-return */
import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch} from "react-redux"
import { toast } from "react-toastify";
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const DisplayCartProducts = ({ p }) => {

    const colors = ["Black", "Brown", "Silver", "White", "Blue"]
    let dispatch = useDispatch()

    const handleColor = (e) => {
        let cart = []
        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if(product._id === p._id){
                    cart[i].color = e.target.value
                }
            })
            
        // console.log('cart udpate color', cart)

            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

    const handleCountChange = (e) => {

        let count = e.target.value < 1 ? 1 : e.target.value;

        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        let cart = []
        if ( typeof window !=="undefined"){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if(product._id === p._id){
                    cart[i].count =count
                }
            })
                    console.log('cart udpate color', cart)

            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }
    const handleRemove = () => {
        console.log(p._id, "to remove");

        let cart = []
        if( typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i)=>{
                if(product._id === p._id){
                    cart.splice(i, 1)
                }
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
            dispatch({
                type: "CART_SIDE_VIEW",
                payload: true,
            });
        }
    }


    return (
        <tbody>
            <tr>
                <div style = {{height:"auto", width:"100px"}}>
                    <td>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url}
                            large={p.images[0].url} />): " No Image"}
                    </td>
                </div>
                
                <td className="text-center">{p.title}</td>
                <td className="text-center">{p.brand}</td>
                <td className="text-center">
                    <select 
                        className="form-control"
                        onChange={handleColor}
                        name="color"
                    >
                        {p.color ? (
                            <option value={p.color}>{p.color}</option>) : (
                            <option>Select</option>
                        )}
                            {colors.filter((c) => c !== p.color)
                            .map((c) =>(
                                <option value={c} key={c}>{c}</option>
                        ))}
                            
                        </select>
                </td>

                <td className="text-center">
                    <input 
                        type="number"
                        className="form-control"
                        value = {p.count}
                        onChange={handleCountChange}
                    />
                </td>

                <td className="text-center">
                    {p.shipping === "Yes" ? (
                        <CheckCircleOutlined className="text-success" />
                    ) : (
                        <CloseCircleOutlined className="text-danger" />
                    )}
                </td>
                <td className="text-center">Rs.{p.price}</td>

                <td className="text-center">
                <CloseOutlined
                    onClick={handleRemove}
                    className="text-danger pointer"
                />
                </td>
            </tr>
        </tbody>
    );
};

export default DisplayCartProducts

