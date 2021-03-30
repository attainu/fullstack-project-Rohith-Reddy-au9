const mongoose = require("mongoose");
const{ObjectId} = mongoose.Schema

const SubCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: "name is required",
        minlength : [2, "too short"],
        maxlength : [32, "too long"],
        trim : true
    },
    slug:{
        type: String,
        lowerCase: true,
        unique: true,
        index: true
    },
    parent :{
        type: ObjectId,
        required: true,
        ref: "Category"
    }
    }, {timestamps: true})

module.exports = mongoose.model( 'SubCategory', SubCategorySchema )