const express = require("express");
const router = express.Router();
const checkoutModel = require("../database/models/checkoutSchema");
const Cart = require("../database/models/cartSchema");
const ObjectID = require('mongodb').ObjectID;
const { checkCC, encryptCC, decryptCC } = require('../utils/checkout');
const moment = require("moment");
const UserModel = require("../database/models/userSchema")

router.post("/finishCheckout", async (req, res) => {
    try {
        const { city, street, date, creditCard } = req.body
        const ccType = checkCC(creditCard)
        const encryptedCC = encryptCC(creditCard)
        console.log(encryptedCC);
        const userId = ObjectID(req.headers.user._id);
        let cart = await Cart.findOne({ userId, active: true });
        if (cart) {
            const checkout = await checkoutModel.create({
                city: city,
                street: street,
                ccType: ccType,
                shippingDate: date,
                encryptedCC: encryptedCC,
                cartDetails: cart,
                userDetails: userId
            });
            // Cart.findOneAndUpdate({ userId, active: true }, { $set: { active: false } }, { new: true }, (err, doc) => {
            //     if (err) { }
            // });
            return res.status(201).send(checkout);
        } else {
            console.log('cart not found');
            res.status(404).send('cart not found')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.get("/getInvoiceDetails", async (req, res) => {
    try {
        const userId = ObjectID(req.headers.user._id);
        let checkout = await checkoutModel.findOne({ userDetails: userId, active: true });
        if (checkout) {
            const { encryptedCC, cartDetails, shippingDate } = checkout
            const cartID = ObjectID(cartDetails);
            let cart = await Cart.findOne({ _id: cartID })
            let userDetails = await UserModel.findOne({ _id: userId })
            const { email, firstName, lastName } = userDetails
            let decryptedCC = decryptCC(encryptedCC)
            let dateToShip = moment(shippingDate).format("Do MMMM YYYY");
            const orderDate = moment().format("Do MMMM YYYY");
            return res.status(201).json({ cart: cart.products, checkout: checkout, creditCard: decryptedCC, orderDate, email, fullName: `${firstName} ${lastName}`, dateToShip });
        } else {
            return res.status(404).send("no active invoice found");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;