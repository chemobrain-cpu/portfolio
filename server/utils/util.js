const jwt = require("jsonwebtoken")
require("dotenv").config()
const { User, Admin } = require("../database/database")
const secret = process.env.SECRET_KEY

module.exports.generateAcessToken = (phoneNumber) => {
    let token = jwt.sign({ phoneNumber: phoneNumber }, secret, { expiresIn: "500h" })
    return token
}

module.exports.verifyToken = async (req, res, next) => {
    //getting token from front-end rebook

    let token = req.headers["header"]
    try {
        if (!token) {
            throw new Error("a token is needed oh")
        }
        const decodedToken = jwt.verify(token, secret)
        let user = await User.findOne({ _id: decodedToken.phoneNumber })
        req.user = user
        next()
    } catch (err) {
        let error = new Error("")
        error.statusCode = 302
        error.message = err.message
        return next(error)
    }
}

module.exports.verifyAdmin = async (req, res, next) => {

    try {
        let token = req.headers["header"]
        console.log(token)
        if (!token) {
            throw new Error("a token is needed")
        }
        const decodedToken = jwt.verify(token, secret)
        let admin = await Admin.findOne({ _id: decodedToken.phoneNumber })
        req.user = admin
        console.log(req.user)
        console.log(req.user)
        next()
    } catch (err) {
        let error = new Error("")
        error.statusCode = 301
        error.message = err.message
        return next(error)
    }
}



