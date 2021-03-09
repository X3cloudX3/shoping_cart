const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const { handleRegister, handleLogin, isUserExist } = require('../database/controllers/userController')
const { getUser, } = require('../utils/users')
const moment = require('moment')


router.post("/register", async (req, res, next) => {
    try {
        const result = await handleRegister(req.body)
        res.json({ result, message: "user has registerd successfully" })
    }
    catch (err) {
        const { message } = err
        console.log(err);
        res.json({ message: message })
        throw new Error(message)

    }
})


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await isUserExist(email, password);
        if (!user) return res.status(401).send("ERROR LOGIN");
        const { token, name, fullName, role } = await handleLogin(email)
        return res.json({ token, name, fullName, role, message: 'logged in successfull' })

    } catch (ex) {
        console.log(ex);
        res.json({
            token: "", message: "email or password are incorrect"
        })
    }

})

router.get('/getUserDetails', (req, res, next) => {
    const { autorization } = req.headers
    if (!autorization) {
        res.json({ status: false, message: `sorry ${req.headers} you need to login` })
    }
    else {
        jwt.verify(autorization, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ status: false })
            }
            else {
                const minDate = moment().add(1, 'd').format("YYYY-MM-DD");
                const { id, role, firstName, lastName, city, street } = decoded
                res.json({ id, role, fullName: `${firstName} ${lastName}`, city, street, minDate })
            }
        })
    }
})



module.exports = router;



