const express = require('express')
const router = express.Router()
const app = express()
const { body, validationResult, Result } = require('express-validator')
//importing models
const { User, Order } = require("../database/database")
const jwt = require("jsonwebtoken")
const { generateAcessToken } = require('../utils/util')
const mongoose = require("mongoose")

module.exports.makePayment = async (req, res, next) => {
  const { id, cart, totalAmount, shippingAddress, cardInfo,
  } = req.body
  let userId = req.user._id
  try {
    //fetch the user 
    let user = await User.findOne({ _id: userId })
    if (!user) {
      //if user does not exist return 404 response
      return res.status(404).json({
        response: "you are not registered"
      })
    }
    /*
    make payment
    */


    let order = new Order({
      _id: new mongoose.Types.ObjectId(),
      products: cart.cartItems,
      totalNo: cart.no,
      totalAmount: cart.totalAmount,
      User: user,
      shipping_address: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        address: shippingAddress.address,
        country: shippingAddress.country,
        city: shippingAddress.city,
        state: shippingAddress.state,
        phoneNumber: shippingAddress.phoneNumber,
      },
      date: Date.now()
    })


    let saveOrder = await order.save()
    if (!saveOrder) {
      let error = new Error("resource not saved")
      return next(error)
    }

    let savedOrder = await Order.findOne({_id:saveOrder._id}).populate("products")

    if (!saveOrder) {
      let error = new Error("resource not saved")
      return next(error)
    }

    return res.status(200).json({
      response: savedOrder
    })


  } catch (error) {
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}
module.exports.getUser = async (req, res, next) => {
  try {

    const userId = req.user._id
    let foundUser = await User.findOne({ _id: userId }).populate({
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

    if (!foundUser) {
      return res.status(404).json({
        response: "you are not registered"
      })
    }

    return res.status(200).json(foundUser)

  } catch (error) {
    console.log(error)
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}
module.exports.modifyUser = async (req, res, next) => {
  try {
    const userId = req.user._id
    let path
    let foundUser = await User.findOne({ _id: userId }).populate({
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

    if (!foundUser) {
      return res.status(404).json({
        response: "you are not registered"
      })
    }
    //modifying user at this point
    const { username,
      country,
      state } = req.body
      if(req.file){
        path = req.file.path
      }

      if(!path){
        foundUser.username = username
        foundUser.country = country
        foundUser.state = state

        let modifiedUser = await foundUser.save()
        //update user without photo
        return res.status(200).json(modifiedUser)
      }
      //update user with photo
      foundUser.username = username
      foundUser.country = country
      foundUser.state = state
      foundUser.photo= path
      let modifiedUser = await foundUser.save()

      return res.status(200).json(modifiedUser)


   

  } catch (error) {
    console.log(error)
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}
//finding all orders of a specific user by the admin
module.exports.getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params
    // user exist 
    let userExist = await User.findOne({_id:id})
    if (!userExist) {
      return res.status(404).json({
        response: "user not found"
      })
    }
    let userOrders = await Order.find().populate("products").populate('User')
    //filtering ordders to send back to front-end
    if (!userOrders) {
      return res.status(404).json({
        response: "you have no order"
      })
    }
    let filteredOrders = userOrders.filter(data=>data.User._id.toString()=== id)

    
    //calculating total amount user has spent
    let totalAmountSpent = 0
    for (let value of userOrders) {
      totalAmountSpent += Number(value.totalAmount)
    }
   
    return res.status(200).json({
      response: {
        orders: filteredOrders,
        totalAmount: totalAmountSpent,
      }
    })


  } catch (error) {
    console.log(error)
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}
//getting orders of a specific user by the user himself or in session
module.exports.getOrders = async (req, res, next) => {
  try {
    const id = req.user._id.toString()
    // user exist 
    let userOrders = await Order.find().populate("products").populate("User")

    if (!userOrders) {
      return res.status(404).json({
        response: "you have no order"
      })
    }


    let filteredOrders = userOrders.filter(data=>data.User._id.toString() === id)

    //calculating total amount user has spent
    let totalAmountSpent = 0
    for (let value of filteredOrders) {
      totalAmountSpent += Number(value.totalAmount)
    }
    
    return res.status(200).json({
      response: {
        orders:filteredOrders,
        totalAmount: totalAmountSpent,
      }
    })


  } catch (error) {
    console.log(error)
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}
//getting specific user order
module.exports.getOrder = async (req, res, next) => {
  try {
    const { orderid } = req.params
    const userId = req.user._id
    let foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      return res.status(404).json({
        response: "you are not registered"
      })
    }

    let userOrder = await Order.findOne({ _id: orderid}).populate("products")

    if (!userOrder) {
      return res.status(404).json({
        response: "you have no order"
      })
    }
    return res.status(200).json(userOrder)

  } catch (error) {
    error.message = error.message || "an error occured try later"
    return next(error)

  }

}


