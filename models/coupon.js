const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const couponSchema = new mongoose.Schema(
    {
        name :{
            type: String,
            upperCase: true,
            minlength: [8, "Short"],
            maxlength: [16, "long"],
            required: "Name is required",
            unique: true
        },
        expiry : {
            type: Date,
            required: true,
        }, 
        discount: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Coupon", couponSchema)