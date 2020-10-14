const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }

})

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;