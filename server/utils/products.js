const ProductModel = require("../database/models/productSchema")

async function saveProduct(product) {
    const newProduct = new productModel({ ...product })
    try {
        const dbRes = await newProduct.save();
        return dbRes;
    } catch (ex) {
        console.log(ex.message)
        console.log("product is not saved..")
        return;
    }
}

async function editProduct(product) {
    const { id, name, category, price, imageURL } = product;
    try {
        const productToEdit = await ProductModel.updateOne({ "_id": id }, { $set: { "name": name, "category": category, "price": price, "imageURL": imageURL } });
        if (productToEdit) {
            res.status(201).json({ message: `Product "${name}" was changed successfully.` });
        } else {
            res.status(400).json({ message: ` We have an error .` });
        }
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: ` We have an error with data : ${err.message}` });
    }
}

module.exports = {
    saveProduct,
    editProduct
}