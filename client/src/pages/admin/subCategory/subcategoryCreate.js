import React,{ useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminnav"
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import {  getCategories } from "../../../function/category"

import { createSubCategory, getSubCategories, removeSubCategory } from "../../../function/subcategory"

import { Link } from "react-router-dom"
import {EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryFrom from '../../../components/form/categoryForm'
import SearchForm from '../../../components/form/searchForm'



const SubCategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // parent category 
    const [category, setCategory] = useState('')
    const [subcategories, setSubCategories] = useState([]);


    const [ keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories();
        loadSubCategories()
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubCategories = () =>
        getSubCategories().then((c) => setSubCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
      // console.log(name);
        setLoading(true);
        createSubCategory({ name, parent: category }, user.token)
        .then((res) => {
          // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`);
            loadSubCategories();
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
    };

    const handleRemove = async (slug) => {
      // let answer = window.confirm("Delete?");
      // console.log(answer, slug);
        if (window.confirm("Delete?")) {
        setLoading(true);
        removeSubCategory(slug, user.token)
        .then((res) => {
            setLoading(false);
            toast.error(`${res.data.name} deleted`);
            loadSubCategories()
        })
        .catch((err) => {
            if (err.response.status === 400) {
                setLoading(false);
                toast.error(err.response.data);
            }
        });
    }
    };

    const searchedItem = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


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
                        <select name = "category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option>Please Select one Main Category</option>
                            {categories.length > 0 && 
                                categories.map((c)=>
                                <option key = {c._id} value = {c._id}>
                                    {c.name}
                                </option>)}
                        </select>
                    </div>

                    <CategoryFrom 
                        handleSubmit = {handleSubmit}
                        name={name}
                        setName = {setName}
                    />

                    <SearchForm 
                        keyword={keyword}
                        setKeyword = {setKeyword}
                    />

                    <hr />
                    {subcategories.filter(searchedItem(keyword)).map((s) => (
                    <div className="alert alert-secondary" key={s._id}>
                        {s.name}
                        <span
                        onClick={() => handleRemove(s.slug)}
                        className="btn btn-sm float-right"
                        >
                        <DeleteOutlined className="text-danger" />
                        </span>
                        <Link to={`/admin/subcategory/${s.slug}`}>
                        <span className="btn btn-sm float-right">
                            <EditOutlined className="text-warning" />
                        </span>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCreate;


