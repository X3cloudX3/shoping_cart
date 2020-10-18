const bcrypt = require('bcryptjs');
const {
    saveUser,
    getUser,
    checkPassword,
    getToken
} = require('../../utils/users')

async function isUserExist(userEmail, password) {
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
async function handleRegister(userDetails) {
    try {
        console.log('4', userDetails);
        const { password } = userDetails
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
        console.log('5', encryptPassword);
        const result = await saveUser({ ...userDetails, password: encryptPassword, salt })
        console.log('6', result);
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
        const { id, role, firstName, lastName } = user
        const token = await getToken({ email, id, role, firstName, lastName })
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