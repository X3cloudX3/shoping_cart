const ProductModel = require("../database/models/productSchema")
const ObjectID = require('mongodb').ObjectID;

async function saveProduct(product) {
    const newProduct = new ProductModel({ ...product })
    try {
        const dbRes = await newProduct.save();
        return dbRes;
    } catch (ex) {
        console.log(ex.message)
        console.log("product is not saved..")
        return;
    }
}

async function editProduct(productNG) {
    const { product } = productNG;
    try {
        const productToEdit = await ProductModel.updateOne({ _id: ObjectID(product.id) }, { $set: { name: product.name, category: product.category, price: product.price, imageURL: product.imageURL }, },
            function (err, user) {
                if (err) return console.log(err);
            })
        if (productToEdit) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err.message);
        return false

    }

}


module.exports = {
    saveProduct,
    editProduct
}