const UserModel = require("../database/models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function saveUser(user) {
    const newUser = new UserModel({ ...user })
    try {
        const result = await newUser.save()
        return result
    } catch (err) {
        throw new Error(err.message)
    }
}
async function getUser(email) {
    try {
        const user = await UserModel.find({ email })
        return user
    } catch (err) {
        return console.log(err.message)
    }
}
async function checkPassword(password, userPassword) {
    try {
        const compare = await bcrypt.compare(password, userPassword)
        if (compare) {
            return true
        } else {
            throw new Error("user not exists")
        }
    } catch (err) {
        return console.log(err.message)
    }
}

async function getToken({ email, _id, id, role, firstName, lastName }) {
    const { SECRET } = process.env
    const token = jwt.sign({ email, _id, id, role, firstName, lastName }, SECRET, { expiresIn: "1h" })
    return token
}

module.exports = {
    saveUser,
    getUser,
    checkPassword,
    getToken

}