const express = require("express");
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
                if (amount <= 0 || amount > 99) {
                    productItem.amount = productItem.amount + 1
                    productItem.priceWithAmount = Math.round(price * 1);
                } else {
                    productItem.amount = productItem.amount + amount;
                    console.log(productItem.amount);
                    productItem.priceWithAmount = Math.round(price * productItem.amount);
                }
                cart.products[itemIndex] = productItem;
                cart = await cart.save();
            } else {
                //product does not exists in cart, add new item
                if (amount <= 0 || amount > 99) {
                    cart.products.push({ imageURL, category, name, price, amount: 1, priceWithAmount: price });
                    cart = await cart.save();
                } else {
                    cart.products.push({ imageURL, category, name, price, amount, priceWithAmount });
                    cart = await cart.save();
                }

            }
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

router.post("/editItemFromCart", async (req, res, next) => {
    const { item } = req.body

    const userId = ObjectID(req.headers.user._id);
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            let itemIndex = cart.products.findIndex(p => p._id == item._id);
            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                if (item.amount <= 0 || item.amount > 99) {
                    productItem.amount = 1
                    productItem.priceWithAmount = Math.round(item.price * 1);
                } else {
                    productItem.amount = item.amount;
                    productItem.priceWithAmount = Math.round(item.price * item.amount);
                }
                cart.products[itemIndex] = productItem;
                cart = await cart.save();
                return res.status(201).send(cart);
            } else {
                return res.status(404).send("item not found");
            }
        } else {
            return res.status(404).send("cart not found");
        }
    } catch (err) {
        console.log(err);
    }
})

router.post("/deleteFromCart", async (req, res, next) => {
    const { item } = req.body
    const userId = ObjectID(req.headers.user._id);
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            let itemIndex = cart.products.findIndex(p => p._id == item._id);
            if (itemIndex > -1) {
                cart.products.splice(itemIndex, 1)
                cart = await cart.save();
                return res.status(201).send(cart);
            } else {
                return res.status(404).send("item not found");
            }
        } else {
            return res.status(404).send("cart not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})
module.exports = router;