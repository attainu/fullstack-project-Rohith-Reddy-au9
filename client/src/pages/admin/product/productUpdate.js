/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminnav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../function/product";
import {  getCategories, getCategorySub, } from "../../../function/category"
import { LoadingOutlined } from "@ant-design/icons";

import FileUpload from "../../../components/form/fileUpload"
import ProductUpdateForm from "../../../components//form/productUpdateForm"

const initialState = {
    title: "",
    descriptioin: "",
    price: "",
    category: "",
    subc: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Police", "4711", "PlayBoy", "Estle", "Swiss Image", "Plum", "Deborah Milano", "Ajmal", "Guess"],
    color: "",
    brand: "",
};

const ProductUpdate = ({match, history}) => {

        const { user } = useSelector((state) => ({ ...state}))

        //state
        const [values, setValues] = useState(initialState);
        const [subOptions, setSubOptions] = useState([])
        const [ categories, setCategories] = useState([])
        const [ arrayOfSubs, setArrayOfSubs ] = useState([])
        const [selectedCategory, setSelectedCategory] = useState("");
        const [loading, setLoading] = useState(false)


        //routes
        const { slug } = match.params

        useEffect(() => {
            loadProduct()
            loadCategories()
        }, [] )

        const loadProduct = () => {
            getProduct(slug).then((p) => {
              // console.log("single product", p);
              // 1 load single proudct
                setValues({ ...values, ...p.data });
              // 2 load single product category subs
                getCategorySub(p.data.category._id).then((res) => {
                    setSubOptions(res.data); // on first load, show default subs
                });
              // 3 prepare array of sub ids to show as default sub values in antd Select
                let arr = [];
                p.data.subc.map((s) => 
                    arr.push(s._id)
                );
                console.log("ARR", arr);
                setArrayOfSubs((prev) => arr); // required for ant design select to work
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            
            values.subc = arrayOfSubs;
            values.category = selectedCategory ? selectedCategory : values.category;

            updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
        };

        const handleChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value });
            // console.log(e.target.name, " ----- ", e.target.value);
        };
        
        const loadCategories = () =>
            getCategories().then((c) => {
                // console.log("SET Categories>>>>>", c.data)
                setCategories(c.data);
            });


        const handleCategoryChange = (e) => {
            e.preventDefault();
            // console.log("CLICKED CATEGORY PRODUCT UPDATE>>>", e.target.value)
            setValues({ ...values, subc : []});
            setSelectedCategory( e.target.value )
            getCategorySub(e.target.value)
            .then((res) => {
                // console.log("SUB CATEGORY options>>>", res)
                setSubOptions(res.data);
            })
            // console.log("EXISITING CATEGORY>>>", values.category)
              // if user clicks back to the original category
                // show its sub categories in default
            if ( values.category._id === e.target.value){
                loadProduct()
            }
            setArrayOfSubs([])
        }


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
        
                    <div className="col-md-10">
                        {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                        ) : (
                            <h4>Product update</h4>
                        )}
                                  {/* {JSON.stringify(values)} */}

                        <hr />
                        <div className="p-3">
                            <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                            />
                        </div>
                        {/* {JSON.stringify(values)} */}
                        <ProductUpdateForm 
                            handleSubmit = {handleSubmit}
                            handleChange = {handleChange}
                            values = {values}
                            setValues = {setValues}
                            handleCategoryChange = {handleCategoryChange}
                            categories = {categories}
                            subOptions={subOptions}
                            arrayOfSubs={arrayOfSubs}
                            setArrayOfSubs={setArrayOfSubs}
                            selectedCategory = {selectedCategory}
                        />
                    </div>
                </div>
            </div>
        );
    };
    

export default ProductUpdate;

