const express = require("express");
const productModel = require("../database/models/productSchema")
const router = express.Router();
const { saveProduct, editProduct } = require('../utils/products')

router.get("/getProducts", async (req, res, next) => {
    try {
        const result = await productModel.find({});
        if (!result) return next(new Error("error message"))
        return res.json({ result })
    } catch (ex) {
        console.log('get product err', ex.message)
        res.status(404).send('no products were found')
        return;
    }

});
router.post('/addProduct', async (req, res, next) => {
    try {
        const result = await saveProduct(req.body)
        if (!result) return next(new Error("error message"))
        return res.json({ result })
    } catch (ex) {
        console.log('add product err', ex.message)
        res.status(500).send('somthing went wrong')
        return;
    }
})
router.post('/editProduct', async (req, res, next) => {
    try {
        const result = await editProduct(req.body)
        if (!result) return next(new Error("error message"))
        return res.json({ result })
    } catch (ex) {
        console.log('edit product err', ex.message)
        res.status(500).send('somthing went wrong')
        return;
    }
})



module.exports = router;