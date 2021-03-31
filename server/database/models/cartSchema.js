const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            sparse: true,
            ref: "users",

        },
        products: [
            {
                imageURL: String,
                category: String,
                name: String,
                price: Number,
                amount: Number,
                priceWithAmount: Number,
            }
        ],
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);