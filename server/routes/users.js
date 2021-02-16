const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const { handleRegister, handleLogin, isUserExist } = require('../database/controllers/userController')




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
        res.json({ status: false, message: `sorry ${req.headers} you need a token` })
    }
    else {
        jwt.verify(autorization, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ status: false })
            }
            else {
                const { id, role, firstName, lastName } = decoded

                res.json({ id, role, fullName: `${firstName} ${lastName}` })
            }
        })
    }
})

// router.get("/verify", async (req, res, next) => {
//     try {
//         setTimeout(() => {
//             const { authorization } = req.heade
//             jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
//                 if (err) return res.json({ status: false })
//                 if (decoded.user_type === "admin") { return res.json({ status: true, admin: true, userId: decoded.id }) } else {
//                     return res.json({ status: true, admin: false, userId: decoded.id })
//                 }
//             })
//         }, 2000);
//     } catch (ex) {
//         return res.json({ status: false })
//     }

// })

module.exports = router;



