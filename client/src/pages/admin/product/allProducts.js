import React, { useState, useEffect }from "react";
import AdminNav from "../../../components/nav/adminnav"
import { useSelector } from  "react-redux"
import { getProductsByCount, ProductRemove } from '../../../function/product'
import AdminProductCard from '../../../components/card/adminproductcard'
import { toast } from "react-toastify";

const AllProducts = () => {

    const { user } = useSelector((state) => ({...state}))

    const [loading, setLoading] = useState(false)
    const [ products, setProducts] = useState([])

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () =>{
        setLoading(true)
        getProductsByCount(100)
        .then((res)=>{
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err)=> {
            setLoading(false)
            console.log(err)
        })
    }

    const removeProduct = (slug) =>{
            
        if(window.confirm("Are you sure you want to delete?")){
            ProductRemove(slug, user.token)
                .then((res) =>{
                    loadAllProducts()
                    toast.error(`${res.data.title} is deleted`);
                })
                .catch((err) =>{
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err);
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
                    <div className="row">
                        {products.map((product) => (
                        <div key={product._id} className="col-md-4 pb-4">
                            <AdminProductCard 
                                product={product} 
                                removeProduct={removeProduct}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
