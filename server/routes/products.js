const express = require("express");
const productModel = require("../database/models/productSchema")
const router = express.Router();
const { saveProduct, editProduct } = require('../utils/products')

router.get("/getProducts", async (req, res, next) => {
    const result = await productModel.find({});
    if (!result) return next(new Error("error message"))
    return res.json({ result })
});
router.post('/addProduct', async (req, res, next) => {
    try {
        const result = await saveProduct(req.body)
        if (!result) return next(new Error("error message"))
        return res.json({ message: "product saved" })
    } catch (ex) {
        console.log('add product err', ex.message)
        return;
    }
})
router.post('/editProduct', async (req, res, next) => {
    try {
        const result = await editProduct(req.body)
        if (!result) return next(new Error("error message"))
        return res.json({ message: "product was edited" })
    } catch (ex) {
        console.log('edit product err', ex.message)
        return;
    }
})



module.exports = router;