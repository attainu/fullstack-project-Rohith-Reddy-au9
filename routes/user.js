const express = require('express')
const router = express.Router()

// middleware 
const { authCheck, adminCheck } = require("../middleware/auth")

// controllers
const { userCart, getUserCart, emptyCart, saveAddress,
        addToWishlist, getWishlist, removeWishlist,
        couponApply, createOrder, orders
    } = require("../controller/user")

//cart
router.post("/user/cart", authCheck, userCart ) 
router.get("/user/cart", authCheck, getUserCart ) 
router.delete("/user/cart", authCheck, emptyCart ) 
router.post("/user/address", authCheck, saveAddress);


router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, getWishlist)
router.put('/user/wishlist/:productId', authCheck, removeWishlist)

// coupon
router.post("/user/cart/coupon", authCheck, couponApply);



module.exports = router
