/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminnav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../function/product";
import {  getCategories, getCategorySub, } from "../../../function/category"
import { LoadingOutlined } from "@ant-design/icons";

import ProductForm from "../../../components/form/productCreateForm"
import FileUpload from "../../../components/form/fileUpload"


const initialState = {
    title: "",
    descriptioin: "",
    price: "999",
    categories: [],
    category: "",
    subc: [],
    shipping: "Yes", 
    quantity: "50",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "pink", "Gold"],
    brands: ["Police", "4711", "PlayBoy", "Estle", "Swiss Image", "Plum", "Deborah Milano", "Ajmal", "Guess"],
    color: "White",
    brand: "4711",
};

const ProductCreate = () => {

        const [values, setValues] = useState(initialState);
        const [subOptions, setSubOptions] = useState([])
        const [showSub, setShowSub] = useState(false)
        const [loading, setLoading] = useState(false)
        // redux
        const { user } = useSelector((state) => ({ ...state }));
        // destructure
        
        useEffect(() => {
            loadCategories();
        }, []);

        const loadCategories = () =>
            getCategories().then((c) => setValues({...values, categories: c.data}));

        const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                // console.log(res);
                window.alert(`${res.data.title} is created`)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err)
            });
        };
    
        const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
        };

        const handleCatagoryChange = (e) => {
            e.preventDefault();
            // console.log("CLICKED CATEGORY>>>", e.target.value)
            setValues({ ...values, subc : [], category: e.target.value });
            getCategorySub(e.target.value)
            .then((res) => {
                // console.log("SUB CATEGORY options>>>", res)
                setSubOptions(res.data);
            })
            setShowSub(true);
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
        
                    <div className="col-md-10">
                        {loading ? <LoadingOutlined className="text-danger h1"/>: <h4>Product create</h4>}
                        <hr />

                        {/* {JSON.stringify(values)} */}
                        {/* {JSON.stringify(values.images)} */}
                        

                        <div className="p-3">
                            <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                            />
                        </div>
                        < ProductForm
                            handleSubmit = {handleSubmit}
                            handleChange = {handleChange}
                            handleCatagoryChange = {handleCatagoryChange}
                            setValues = {setValues}
                            values = {values}
                            showSub = {showSub}
                            subOptions = {subOptions}
                        />

                        
                    </div>
                </div>
            </div>
        );
    };
    
export default ProductCreate;

