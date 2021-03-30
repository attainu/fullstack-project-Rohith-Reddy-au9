/* eslint-disable react-hooks/exhaustive-deps */

import React,{ useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminnav"
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import {  getCategories } from "../../../function/category"
import { getSubCategory, updateSubCategory } from "../../../function/subcategory"
import CategoryFrom from '../../../components/form/categoryForm'

const SubCategoryUpdate = ({match, history}) => {

    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // parent category 
    const [parent, setParent] = useState('')

    useEffect(() => {
        loadCategories();
        loadSubCategory()
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubCategory = () =>
        getSubCategory(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
      // console.log(name);
        setLoading(true);
        updateSubCategory(match.params.slug, { name, parent }, user.token)
        .then((res) => {
          // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is updated`);
            // loadSubCategories();
            history.push('/admin/subCategory')
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                    {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                    ) : (
                    <h4>Create Sub-category</h4>
                    )}
                    <div className="form-group">
                        <label>Parent category</label>
                        <select 
                            name = "category" 
                            className="form-control" 
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please Select one Main Category</option>
                                {categories.length > 0 && 
                                    categories.map((c)=>(
                                    <option key = {c._id} value = {c._id} selected = {c._id === parent}>
                                        {c.name}
                                </option>
                                ))}
                        </select>
                    </div>

                    <CategoryFrom 
                        handleSubmit = {handleSubmit}
                        name={name}
                        setName = {setName}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubCategoryUpdate;
