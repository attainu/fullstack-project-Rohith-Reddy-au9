import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from './components/nav/Header';
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/user"
import AdminRoute from "./components/routes/admin"

import Password from "./pages/user/password"
import Wishlist from "./pages/user/wishlist"
import AdminDashboard from "./pages/admin/adminDashboard"
import CategoryCreate from "./pages/admin/category/createcategory"
import CategoryUpdate from "./pages/admin/category/categoryUpdate"
import SubCategoryCreate from "./pages/admin/subCategory/subcategoryCreate"
import SubCategoryUpdate from "./pages/admin/subCategory/subcategoryUpdate"
import ProductCreate from "./pages/admin/product/productCreate"
import AllProducts from "./pages/admin/product/allProducts"
import ProductUpdate from "./pages/admin/product/productUpdate"
import ProductView from "./pages/product"

import CouponPage from "./pages/admin/coupon/coupon"

import Shop from "./pages/shop"

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import {currentUser} from './function/auth'
import Cart from './pages/Cart'
import  SideDrawer  from './components/drawer/cartSide'

import Checkout from './pages/checkout'
import PaymentPage from './pages/palceOrder'

const App = () => {
const dispatch = useDispatch()

// to check firebase auth state
useEffect(() => {

  const unsubscribe = auth.onAuthStateChanged(async (user) => {

    if(user) {
      const idTokenResult = await user.getIdTokenResult()
      // console.log("user", user);

      currentUser(idTokenResult.token)
                .then((res)=>{
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                            },
                      });
                })
                .catch((err)=>{
                  console.log(err)
                });
    }
});
  // cleanup
  return () => unsubscribe();

}, [dispatch]);

  return(
    
    <>
    <Header/>
    <SideDrawer />
    <ToastContainer/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/password" component={Password} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/subcategory" component={SubCategoryCreate} />
        <AdminRoute exact path="/admin/subcategory/:slug" component={SubCategoryUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/coupon" component={CouponPage} />

        <Route exact path="/product/:slug" component={ProductView} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/placeorder" component={PaymentPage} />
    </Switch>
    </>

  )
}

export default App;
