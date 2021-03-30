import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DisplayCartProducts from "../components/card/displaycartItems"
import { userCart } from '../function/user'


const Cart = ({ history}) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    // const dispatch = useDispatch();

    const getTotal = () =>{
        return cart.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }


    const saveOrderToDb = () => {
        // console.log("CART", JSON.stringify(cart, null, 4))
        userCart(cart, user.token).then((res) =>{
            console.log("CART POST RES---------->", res);
            if ( res.data.ok)  history.push('/checkout')
        }) 
        .catch((err) => console.log("cart save err", err))
    };

    const displayCartItems = () => (
        <table className="table table-bordered table-hover ">
            <thead className = "table-secondary text-danger">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map((p)=>(
                <DisplayCartProducts key={p.id} p = {p} />
            ))}
        </table>
    )


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart/{cart.length}</h4>
                    {!cart.length ? (
                        <p>
                            No Products in cart. Click Here for <Link to="/shop"> Shopping</Link>
                        </p>) :(
                            displayCartItems()
                        )}
                </div>


                <div className="col-md-4">
                    <h3>OrderSummary</h3>
                    <hr />
                    <p>Products</p>
                    <hr />
                    {cart.map((c, i) =>  (
                        <div key = { i }>
                            <p>{c.title} x {c.count} = Rs.{c.price * c.count}</p>
                        </div>)
                    )}
                    <hr />
                    Total: <b>Rs.{getTotal()}</b>
                    <hr />
                    { user ? (
                        <button 
                            className="btn btn-sm btn-primary mt-2"
                            disabled={ !cart.length }
                            onClick={saveOrderToDb}
                        >
                            Proceed to CheckOut
                        </button>
                    ) :(
                        <button className="btn btn-sm btn-primary mt-2">
                            <Link
                                to = {{
                                    pathname : '/login',
                                    state : { from: 'cart'}
                                }}
                            >
                                Login to Checkout
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
