const express = require('express')
const router = express.Router()
const app = express()
const { body, validationResult, Result } = require('express-validator')
//importing models
const { Admin, Product, User,Order,Comment } = require("../database/database")
//import {env} from "../enviroment"
const jwt = require("jsonwebtoken")
const { generateAcessToken } = require('../utils/util')
const mongoose = require("mongoose")


module.exports.signupAdmin = async (req, res, next) => {
    try {
        const { username, userEmail, userPassword, userCountry, userState, userPhoneNumber } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }

        let userExist = await Admin.findOne({ email: userEmail })
        let allUsers = await User.find()
        let allAdmin = await Admin.find()

        if (userExist) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "admin with that email exists"
            })
        }
        //creating a new user 
        let newUser = new Admin({
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
       
        const userToSend = await Admin.findOne({_id:savedUser._id}).populate({
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
        const accessToken = generateAcessToken(userToSend._id)
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

module.exports.loginAdmin = async (req, res, next) => {
    try {
        const { userEmail, userPassword } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }

        let userExist = await Admin.findOne({ email: userEmail })
        if (!userExist) {
            //if user does not exist return 404 response
            return res.status(404).json({
                response: "user does not exist"
            })
        }
        //authenticate user i.e checking password
        let passwordFromStorage = userExist.password
        if (passwordFromStorage !== userPassword) {
            return res.status(404).json({
                response: "password incorrect"
            })
        }
        let allUsers = await User.find()
        let allAdmin = await Admin.find()
        const accessToken = generateAcessToken(userExist._id)

        const userToSend = await Admin.findOne({_id:userExist._id}).populate({
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

module.exports.addProduct = async (req, res, next) => {
    console.log(req.body)
    try {
        let {
            productCategory,
            productSubCategory,
            productAmount,
            ProductName,
            negotiable,
            about
        } = req.body
        let photo = req.file.path
        let admin = req.user

        //checking if admin exist
        let AdminExist  = await Admin.findOne({_id:admin._id})
        if(!AdminExist){
            return res.status(404).json({
                response: "you are not registered"
            })

        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }
        //creating a new user 
        let product = new Product({
            _id: new mongoose.Types.ObjectId(),
            photos: photo,
            category: productCategory,
            subCategory: productSubCategory,
            amount: productAmount,
            NameOfProduct: ProductName,
            negotaible: negotiable,
            date: Date.now(),
            about: about,
            admin:AdminExist
        })
        //saving the user

        let newProduct = await product.save()
        console.log(newProduct)
        if (!newProduct) {
            let error = new Error("resource not saved")
            return next(error)
        }
        let allProduct = await Product.find()
        return res.status(200).json({
            response: allProduct
        })
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}
module.exports.deleteProduct = async (req, res, next) => {
    //deleting a product
    try {

        let id = req.params.id
        let productToDelete = await Product.findOne({ _id: id })
        //delete comment too 
        let deletedComment = await Comment.deleteOne({ product: productToDelete._id })
        if (!deletedComment) {
            return res.status(400).json({
                response: "comment could not be deleted"
            })

        }
        

        if (!productToDelete) {
            return res.status(404).json({
                response: "product does not exist"
            })

        }
        let deletedProduct = await Product.deleteOne({ _id: id })
        if (!deletedProduct) {
            return res.status(400).json({
                response: "product could not be deleted"
            })

        }
        //deleting the product notification from all users
        let allUsers = await User.find()

        for(let mem of allUsers){
            let arr = []
            let notifications = mem.notifications.map(data=>{
                if(data.idOfProduct.toString() !== productToDelete._id.toString()){
                    arr.push(data)
                }
            })

            mem.notifications = arr
            await mem.save()

        }

//deleting the product notification from all admin
        let allAdmins = await Admin.find()

        for(let mem of allAdmins){
            let arr = []
            let notifications = mem.notifications.map(data=>{
                if(data.idOfProduct.toString() !== productToDelete._id.toString()){
                    arr.push(data)
                }
            })

            mem.notifications = arr
            await mem.save()

        }


        let allProduct = await Product.find()
        return res.status(200).json({
            response: allProduct
        })


    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}
module.exports.editProduct = async (req, res, next) => {

    try {
        const id = req.params.id
        let {
            productCategory,
            productSubCategory,
            productAmount,
            ProductName,
            negotiable,
            about
        } = req.body
        let photo = req.file.path
        //getting the id of product to edit

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("invalid user input")
            return next(error)
        }
        //finding product with that id 
        let product = await Product.findOne({ _id: id })
        //saving the user

        if (!product) {
            return res.status(400).json({
                response: "product could not be found"
            })
        }
        product.photos = photo
        product.productCategory = productCategory
        product.productSubCategory = productSubCategory
        product.productAmount = productAmount
        product.ProductName = ProductName
        product.negotiable = negotiable
        product.about = about

        let savedProduct = await product.save()
        if (!savedProduct) {
            let error = new Error("resource not saved")
            return next(error)
        }
        let allProducts = await Product.find()
        return res.status(200).json({
            response: allProducts
        })
    } catch (error) {
        error.message = error.message || "an error occured try later"
        return next(error)
    }
}
module.exports.getAdmin = async (req, res, next) => {
    
    try {

        const adminId = req.user._id
        let foundAdmin = await Admin.findOne({ _id: adminId }).populate({
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

       
        if (!foundAdmin) {
            return res.status(404).json({
                response: "you are not registered"
            })
        }

        return res.status(200).json(foundAdmin)

    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.modifyAdmin = async (req, res, next) => {
    try {
        const adminId = req.user._id
        let path
        let foundAdmin = await Admin.findOne({ _id: adminId }).populate({
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

        if (!foundAdmin) {
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        //modifying user at this point
        const { username,
            country,
            state } = req.body
        if (req.file) {
            path = req.file.path
        }

        if (!path) {
            console.log("no photo")
            foundAdmin.username = username
            foundAdmin.country = country
            foundAdmin.state = state

            let modifiedAdmin = await foundAdmin.save()
            //update user without photo
            return res.status(200).json(modifiedAdmin)
        }
        //update user with photo
        console.log("with photo")
        foundAdmin.username = username
        foundAdmin.country = country
        foundAdmin.state = state
        foundAdmin.photo = path
        let modifiedAdmin = await foundAdmin.save()

        return res.status(200).json(modifiedAdmin)




    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.getAdminOrders = async (req, res, next) => {
   
    try {
        const userId = req.user._id.toString()
        // user exist 
        let userOrders = await Order.find().populate("products")
        if (!userOrders) {
            return res.status(404).json({
                response: "you have no order"
            })
        }
        //calculating total amount user has spent
        let totalAmountSpent = 0
        for (let value of userOrders) {
            totalAmountSpent += Number(value.totalAmount)
        }
        return res.status(200).json({
            response: {
                orders: userOrders,
                totalAmount: totalAmountSpent,
            }
        })


    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.getAdminOrder = async (req, res, next) => {
    try {
        const {orderid } = req.params
        const userId = req.user._id
        let foundAdmin = await Admin.findOne({ _id: userId })
        if (!foundAdmin) {
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        let order = await Order.findOne({ _id: orderid }).populate("products")
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.activateOrder = async (req, res, next) => {
    try {
        const {orderid } = req.params
        const userId = req.user._id
        let foundAdmin = await Admin.findOne({ _id: userId })
        if (!foundAdmin) {
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        let order = await Order.findOne({ _id: orderid }).populate("products")
        //modify the order
        let status = order.status
        if(status === "activated"){
            status = "pending"

        }else if(status === "pending"){
            status = "activated"

        }

        order.status = status
        let savedOrder = await order.save()
        if(!savedOrder){
            return res.status(404).json({
                response: "resource not saved"
            }) 
        }
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}
module.exports.getUsers = async (req, res, next) => {
    try {
        const userId = req.user._id
        let foundAdmin = await Admin.findOne({ _id: userId })
        if (!foundAdmin) {
            return res.status(404).json({
                response: "you are not registered"
            })
        }
        let users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        error.message = error.message || "an error occured try later"
        return next(error)

    }

}

