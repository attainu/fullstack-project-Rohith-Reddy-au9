const User = require("../models/user")
const Product = require("../models/product")
const Cart = require("../models/cart");
const  Coupon = require("../models/coupon");
const Order = require("../models/orders");

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color; 
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });

}


exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};


exports.emptyCart = async(req, res) => {
  console.log("empty cart");

  const user = await User.findOne({email: req.user.email}). exec();
  let cart = await Cart.findOneAndRemove({ orderBy : user._id }).exec()
  res.json(cart)
}

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

  // wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
  
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } }
    ).exec();
  
    res.json({ ok: true });
};

exports.getWishlist = async (req, res) => {
    const getwishlistitems = await User.findOne({email: req.user.email})
    .select('wishlist')
    .populate("wishlist")
    .exec()
    res.json(getwishlistitems)
}

exports.removeWishlist = async (req, res) => {
    const { productId } = req.params
    const updated = await User.findOneAndUpdate(
        { email: req.user.email }, 
        { $pull: {wishlist: productId} })
        .exec()
        res.json({ok:true})
}

exports.couponApply = async ( req, res, next ) => {
  const { coupon } = req. body
  const couponValidate = await Coupon.findOne({ name: coupon}).exec()

  if(couponValidate === null) {
    res.json({
      err: "Invalid coupon! "
    })
  }
  console.log("validate coupon", couponValidate)

  const user = await User.findOne({ email: req.user.email }).exec();


  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

    // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal - (cartTotal * couponValidate.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec()
  res.json(totalAfterDiscount);
}


exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};