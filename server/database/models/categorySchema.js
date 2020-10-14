const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true,
    }
})

const categoryModel = mongoose.model('categories', CategorySchema);
module.exports = categoryModel;