const express = require('express')
const router = express.Router()
const app = express()
const { body, validationResult, Result } = require('express-validator')
//importing models
const { Product, Comment, Admin, User } = require("../database/database")
//import {env} from "../enviroment"
const jwt = require("jsonwebtoken")
const { generateAcessToken } = require('../utils/util')
const mongoose = require("mongoose")


module.exports.getProducts = async (req, res, next) => {


    try {

        let allProduct = await Product.find()
        return res.status(200).json({
            response: {
                products: allProduct
            }
        })
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        let id = req.params.id
        //algorithm for getting a single product
        let product = await Product.findOne({ _id: id }).populate({
            path: "comment",
            populate: {
                path: "user",
                model: "User",
            }
        }).populate({
            path: "comment",
            populate: {
                path: "admin",
                model: "Admin"
            }
        }).populate("admin")

        console.log(product)

        if (!product) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "product does not exist"
            })
        }
        return res.status(200).json({
            response: product
        })
    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}

//comment controller
module.exports.getProductComment = async (req, res, next) => {

    try {
        let id = req.params.id
        //algorithm for getting a single comment from a specific product product
        let comment = await Comment.find({ product: id }).populate("user").populate("admin").populate({
            path: "replies",
            populate: {
                path: "user",
                model: "User"
            }
        }).populate({
            path: "replies",
            populate: {
                path: "admin",
                model: "Admin"
            }
        })
        console.log(comment)

        if (comment.length == 0) {
            //if user does not exist return 404 response
            return res.status(200).json({
                response: []
            })
        }
        return res.status(200).json({
            response: comment
        })
    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}

module.exports.getProductsCategory = async (req, res, next) => {

    try {
        let allProduct = await Product.find({ subCategory: req.params.category })
        console.log(allProduct)
        return res.status(200).json({
            response: {
                products: allProduct
            }
        })
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}
module.exports.readNotification = async (req, res, next) => {
    try {
        let { user, notificationId } = req.body
        if (!user || !notificationId) {
            return res.status(404).json({
                response: "product does not exist"
            })
        }
        if (user.admin) {
            //check if user exsit
            let userExist = await Admin.findOne({ _id: user._id }).populate({
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
            if (!userExist) {
                return res.status(404).json({
                    response: "product does not exist"
                })
            }

            //filter the notification by id
            let notification = userExist.notifications.map(data => {
                if (data.id.toString() === notificationId.toString()) {
                    data.status = "read"
                    return data
                } else {
                    return data
                }
            })


            userExist.notifications = notification
            let modifiedUser = await userExist.save()
            console.log(modifiedUser)
            let userToSend = await Admin.findOne({ _id: modifiedUser._id.toString() }).populate({
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
            console.log(notification)
            console.log(userToSend)
            return res.status(200).json(userToSend)



        } else {

            //check if user exsit
            let userExist = await User.findOne({ _id: user._id }).populate({
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

            if (!userExist) {
                return res.status(404).json({
                    response: "product does not exist"
                })
            }

            //filter the notification by id
            let notification = userExist.notifications.map(data => {
                if (data.id.toString() === notificationId.toString()) {
                    data.status = "read"
                    return data
                } else {
                    return data
                }
            })
            
            userExist.notifications = notification
            let modifiedUser = await userExist.save()
            let userToSend = await User.findOne({ _id: modifiedUser._id }).populate({
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
            return res.status(200).json(userToSend)

        }

    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}

