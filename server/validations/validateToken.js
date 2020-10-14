const jwt = require("jsonwebtoken")

module.exports = ((req, res, next) => {
    const { autorization } = req.headers
    if (!autorization) {
        res.json({ status: false })
    }
    else {
        jwt.verify(autorization, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ status: false })
            }
            else {
                const { id, role } = decoded
                req.headers.user = { id, role }
                next()
            }
        })
    }
})