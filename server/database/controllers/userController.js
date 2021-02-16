const bcrypt = require('bcryptjs');
const {
    saveUser,
    getUser,
    checkPassword,
    getToken
} = require('../../utils/users')

async function isUserExist(userEmail, password) {
    try {
        const [result] = await getUser(userEmail);
        const { PasswordHash } = result
        if (!result) throw new Error("user not found"); else {
            const comparePassword = await checkPassword(password, PasswordHash)
            if (comparePassword) return true;
            else {
                throw new Error("user exists")
            }
        }
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}
async function handleRegister(userDetails) {
    try {
        const { password, email } = userDetails
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) throw new Error('email or password are not valid')
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
        const result = await saveUser({ ...userDetails, PasswordHash: encryptPassword, salt })
        return result
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)

    }
}


async function handleLogin(email) {
    try {
        const [user] = await getUser(email)
        const { _id, id, role, firstName, lastName } = user
        const token = await getToken({ email, _id, id, role, firstName, lastName })
        return { token, name: user.email, fullName: `${firstName} ${lastName}`, role }
    }
    catch {
        throw new Error
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    isUserExist
}