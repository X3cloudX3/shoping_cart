const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    PasswordHash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer",

    }

})
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel

