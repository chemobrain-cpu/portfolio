const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")
const  Wallet  = require("../database/databaseConfig").Wallet
const User = require("../database/databaseConfig").User


module.exports.getLogin = async (req,res,next) => {

    res.status(200).render('adminAuth/login')

}
module.exports.getSignup = async (req,res,next) => {

    res.status(200).render('adminAuth/signup')
}
//protected admin route
module.exports.getProfile = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){
        //getting wallet
        let wallet = await Wallet.find()
        return res.status(200).render('adminAuth/profile',{user:req.session.user,wallet:wallet[0]})

    }else{
         return res.status(200).render('adminAuth/login')

    }
   

}
module.exports.getUserDetails = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){
        if(!req.params.id){
           return  res.status(200).render('adminAuth/login')
        }

        let user = await User.findOne({_id:req.params.id})
        if(!user){
            res.status(200).render('adminAuth/login')
        }
        return res.status(200).render('adminAuth/userdetails',{user:user})
    }else{
        res.status(200).render('adminAuth/login')

   }

    

}

module.exports.postUserDetails = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){

        let {firstName,lastName,email,tradingPlan,availableBalance} = req.body
        //finding the user by their email
        let user = await User.findOne({email:email})
        if(!user){
            //do nthing
        }
        user.email = email
        user.firstName = firstName
        user.lastName = lastName
        user.tradingPlan = tradingPlan
        user.availableBalance =  availableBalance

        let savedUser = await user.save()

        let users = await User.find()
        let filteredUsers = users.filter(data=>data._id.toString() !== req.session.user._id.toString())
      

        res.status(200).redirect("/adminusers")

    }else{
        res.status(200).render('adminAuth/login')

   }

    
}

module.exports.getUsers = async (req,res,next) => {
     if(req.session.user && req.session.user.isAdmin ){
        //get all users
        //filter off the admin
        //return the result to the front end

        let users = await User.find()
        let filteredUsers = users.filter(data=>data._id.toString() !== req.session.user._id.toString())
      

        res.status(200).render('adminAuth/users',{users:filteredUsers})
    }else{
        res.status(200).render('adminAuth/login')

   }

    

}

module.exports.getWallet = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){
       res.status(200).render('adminAuth/updatewallet',{user:req.session.user})
   }else{
       res.status(200).render('adminAuth/login')

  }

   

}

module.exports.postWallet = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){
        let {walletAddress} = req.body
        //delete all previous wallet
        let deletedWallet = await Wallet.deleteMany()
        console.log(deletedWallet)

        let newAddress = new Wallet({
            _id: new mongoose.Types.ObjectId(),
            address:walletAddress

        })

        let savedAddress = newAddress.save()
        res.redirect("/adminprofile")
       
   }else{
       res.status(200).render('adminAuth/login')

  }

   

}


