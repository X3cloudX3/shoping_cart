const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        ccType: {
            type: String,
            required: true
        },
        encryptedCC: {
            type: String,
            required: true
        },
        shippingDate: {
            type: String,
            required: true
        },
        cartDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
        userDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        active: {
            type: Boolean,
            default: true
        }
    },

);

module.exports = mongoose.model("checkout", CartSchema);