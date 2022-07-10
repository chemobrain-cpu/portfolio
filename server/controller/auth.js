const express = require('express')
const router = express.Router()
const app = express()
const { body, validationResult, Result } = require('express-validator')
//importing models
const { User,Admin } = require("../database/database")
//import {env} from "../enviroment"
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY
const { generateAcessToken } = require('../utils/util')

const mongoose = require("mongoose")


module.exports.signupUser = async (req, res, next) => {
    try {
        const { username, userEmail, userPassword, userCountry, userState, userPhoneNumber } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }
        let allUsers = await User.find()
        let allAdmin = await Admin.find()

        let userExist = await User.findOne({ email: userEmail}).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })



        if (userExist) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "user with that email exists"
            })
        }
        //creating a new user 
        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            email: userEmail,
            country: userCountry,
            password: userPassword,
            state: userState,
            phone: userPhoneNumber

        })
        //saving the user

        let savedUser = await newUser.save()
        if (!savedUser) {
            let error = new Error("resource not saved")
            return next(error)
        }
        //before returning the saved user 
        /*
        send an acess toen to the front-end so we are sending an object
        */
        const accessToken = generateAcessToken(savedUser._id)

        const userToSend = await User.findOne({_id:savedUser._id}).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })
        return res.status(200).json({
            response: {
                user: userToSend,
                token: accessToken,
                expiresIn: 500,
            }
        })

    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}
module.exports.loginUser = async (req, res, next) => {
    try {
        const { userEmail, userPassword } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }

        let userExist = await User.findOne({ email: userEmail })
        if (!userExist) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        //authenticate user i.e checking password
        let passwordFromStorage = userExist.password
        if (passwordFromStorage !== userPassword) {
            let error = new Error("password incorrect")
            return next(error)
        }
        let allUsers = await User.find()
        let allAdmin = await Admin.find()
        const accessToken = generateAcessToken(userExist._id)

        //trying to reget user from the server 

        const userToSend = await User.findOne({_id:userExist._id}).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })

        return res.status(200).json({
            response: {
                user: userToSend,
                token: accessToken,
                expiresIn: 500,
                users:allUsers,
                admins:allAdmin,
            }
        })

    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        let userExist = await User.findOne({ _id: id })
        if (!userExist) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        const userToSend = await User.findOne({_id:userExist._id}).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })
        //authenticate user i.e checking password
        //get the products,
        //order
        //user



        return res.status(200).json(userToSend)

    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}


module.exports.getUserFromJwt = async (req, res, next) => {
    try {
        let token = req.headers["header"]
        if (!token) {
            throw new Error("a token is needed oh")
        }
        const decodedToken = jwt.verify(token, secret)
       
        
        const user = await User.findOne({ _id: decodedToken.phoneNumber }).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })
        if (!user) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "user has been deleted"
            })
        }
        let allUsers = await User.find()
        let allAdmin = await Admin.find()

        return res.status(200).json({
            response: {
                user: user,
                users:allUsers,
                admins:allAdmin,
            }
        })
       
      
       
    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}

module.exports.getAdminFromJwt = async (req, res, next) => {
    try {
        let token = req.headers["header"]
        if (!token) {
            throw new Error("a token is needed oh")
        }
        const decodedToken = jwt.verify(token, secret)
       
        
        const user = await Admin.findOne({ _id: decodedToken.phoneNumber }).populate({
            path: "notifications",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "notifications",
            populate: {
                path: "admin",
                model: "Admin",
            }
        })
        if (!user) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "user has been deleted"
            })
        }
        let allUsers = await User.find()
        let allAdmin = await Admin.find()

        return res.status(200).json({
            response: {
                user: user,
                users:allUsers,
                admins:allAdmin,
            }
        })
       
      
       
    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}


