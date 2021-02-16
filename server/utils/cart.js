const cartModel = require("../database/models/cartSchema");
const ObjectID = require('mongodb').ObjectID;

async function saveToCart(cart) {
    const newCart = new cartModel({ ...cart })
    try {
        const dbRes = await newCart.save();
        return dbRes;
    } catch (ex) {
        console.log(ex.message)
        throw new Error(ex.message)
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
    saveToCart,
    editProduct
}