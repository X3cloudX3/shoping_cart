const express = require("express");
const { saveToCart } = require("../utils/cart");
const router = express.Router();
const Cart = require("../database/models/cartSchema");
const ObjectID = require('mongodb').ObjectID;

router.post("/addToCart", async (req, res) => {
    const { imageURL, category, name, price, amount, priceWithAmount } = req.body;
    const userId = ObjectID(req.headers.user._id);
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex(p => p.name == name);
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.amount = amount;
                productItem.priceWithAmount = priceWithAmount;
                cart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.products.push({ imageURL, category, name, price, amount, priceWithAmount });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ imageURL, category, name, price, amount, priceWithAmount }]
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.get("/getCartDetails", async (req, res, next) => {
    try {
        const [result] = await Cart.find({});
        if (!result) return next(new Error("error message"))
        res.status(201).send(result.products);
    } catch (err) {
        console.log(err);
        res.status(404).send("cart not found");
    }

});

module.exports = router;