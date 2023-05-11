const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")
const User = require("../database/databaseConfig").User
const Wallet = require("../database/databaseConfig").Wallet
const Trade = require("../database/databaseConfig").Trade
const Withdraw = require("../database/databaseConfig").Withdraw

module.exports.getDeposit = async (req, res, next) => {
   if (!req.session.user) {


      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   //get the wallet
   let wallet = await Wallet.find()

   res.status(200).render('userAuth/deposit', { wallet: wallet[0] })

}

module.exports.getTradecenter = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })
   }

   //getting all trade status for this account
   let allTrade = await Trade.find({ email: req.session.email })
   let allWithdrawal = await Withdraw.find({ email:req.session.email })

   res.status(200).render('userAuth/tradecenter', { user: req.session.user, tradeHistory: allTrade,withdrawHistory:allWithdrawal })

}


module.exports.postTrade = async (req, res, next) => {
   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })

   }
   //serve loader screen 
   if (Number(req.session.user.availableBalance) === 0) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to fund your account before you can start trading"

      return res.status(200).render('userAuth/traderesult', { user: req.session.user, message: message })

   }
   //updating user information 
   let foundUser = await User.findOne({ email: req.session.user.email })
   foundUser.availableBalance = '0'
   foundUser.plan = 'none'


   let savedUser = await foundUser.save()

   let date = new Date()


   let newTrade = new Trade({
      _id: new mongoose.Types.ObjectId(),
      tradeType: req.body.trade_type,
      planOfUser: req.body.plan,
      amountToTrade: req.body.amount,
      dateOfTrade: date.toLocaleString(),
      status: 'pending'
   })

   let savedTrade = await newTrade.save()
   //send an email to admin that trade has been sent



   //send client an email about the trade


   //getting all trade status for this account
   let allTrade = await Trade.find({ email: savedUser.email })

   let allWithdrawal = await Withdraw.find({ email: userExist.email })

   return res.status(200).render('userAuth/tradecenter', { user: req.session.user, tradeHistory: allTrade,withdrawHistory:allWithdrawal})



}


module.exports.getUpgrade = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })
   }
   res.status(200).render('userAuth/upgrade', { user: req.session.user })
}


module.exports.getWithdrawal = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })
   }

   res.status(200).render('userAuth/withdrawal', { user: req.session.user })

}

module.exports.postWithdrawal = async (req, res, next) => {
 const {withdrawal_method} = req.body
 console.log(req.body)

   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   //serve loader screen 
   if (Number(req.session.user.availableBalance) === 0) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to upgrade your account"

      return res.status(200).render('userAuth/withdrawalresult', { user: req.session.user, message: message })

   } else {
      if(withdrawal_method === 'Bank Transfer'){
         return res.status(200).render('userAuth/bankForm', { user: req.session.user, message: message })

      }else if(withdrawal_method === 'PayPal'){
         return res.status(200).render('userAuth/payPalForm', { user: req.session.user, message: message })


      }
      else if (withdrawal_method === 'Bitcoin'){
         return res.status(200).render('userAuth/bitcoinForm', { user: req.session.user, message: message })

      }
      

      





   }


}


module.exports.sendToBank = async (req, res, next) => {
   /* algorithm for sending to bank*/
   let { bank_name,
      acct_no,
      acct_name,
      acct_swift,
      bank_location,
      amount} = req.body

   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }

   //serve loader screen 
   if (Number(req.session.user.availableBalance) < Number(amount)) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to upgrade your account"

      return res.status(200).render('userAuth/withdrawalresult', { user: req.session.user, message: message })

   } else {

      let foundUser = await User.findOne({email:req.session.user.email})

      if(!foundUser){
         //come back later
         return
      }

      foundUser.availableBalance = Number(foundUser.availableBalance - amount)

      savedUser = await foundUser.save()


      //debit client model,
      //send email of debital
      //create a model for withdrawal history
      //
      let date = new Date()

      let newWithdraw = new Withdraw({
         _id: new mongoose.Types.ObjectId(),
         withdrawType:'bank',
         bank_name:bank_name,
         acct_no:acct_no,
         acct_name: acct_name,
         acct_swift:acct_swift,
         bank_location:bank_location,
         amount: amount,
         Date:date.toLocaleString(),
         useremail:req.session.user.email
      })

      await newWithdraw.save()

      res.status(200).render('userAuth/profile', { user: savedUser})

   }








}



module.exports.sendToPaypal = async (req, res, next) => {
   /* algorithm for sending to bank*/
   const { email, amount} = req.body

   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }

   //serve loader screen 
   if (Number(req.session.user.availableBalance) < Number(amount)) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to upgrade your account"

      return res.status(200).render('userAuth/withdrawalresult', { user: req.session.user, message: message })

   } else {

      let foundUser = await User.findOne({email:req.session.user.email})

      if(!foundUser){
         //come back later
         return
      }

      foundUser.availableBalance = Number(foundUser.availableBalance) - Number(amount)

      savedUser = await foundUser.save()


      //debit client model,
      //send email of debital
      //create a model for withdrawal history
      //
      let date = new Date()

      let newWithdraw = new Withdraw({
         _id: new mongoose.Types.ObjectId(),
         withdrawType:'paypal',
         amount: amount,
         Date:date.toLocaleString(),
         email:email,
         useremail:req.session.user.email
      })

      await newWithdraw.save()

      res.status(200).render('userAuth/profile', { user: savedUser})

   }

   








}



module.exports.sendToBtc = async (req, res, next) => {
   /* algorithm for sending to bank*/
   const { btcAddress, amount, } = req.body

   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }

   //serve loader screen 
   if (Number(req.session.user.availableBalance) < Number(amount)) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to upgrade your account"

      return res.status(200).render('userAuth/withdrawalresult', { user: req.session.user, message: message })

   } else {

      let foundUser = await User.findOne({email:req.session.user.email})

      if(!foundUser){
         //come back later
         return
      }

      foundUser.availableBalance = Number(foundUser.availableBalance) - Number(amount)

      savedUser = await foundUser.save()


      //debit client model,
      //send email of debital
      //create a model for withdrawal history
      //
      let date = new Date()

      let newWithdraw = new Withdraw({
         _id: new mongoose.Types.ObjectId(),
         withdrawType:'bitcoin',
         amount: amount,
         Date:date.toLocaleString(),
         btcAddress:btcAddress,
         useremail:req.session.user.email
      })

      await newWithdraw.save()

      res.status(200).render('userAuth/profile', { user: savedUser})

   }
  



}

Withdraw.find().then(data=>{
   console.log(data)
})




module.exports.getProfile = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })
   }
   res.status(200).render('userAuth/profile', { user: req.session.user })

}


//loader
module.exports.getLoading = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })
   }
   res.status(200).render('userAuth/loading', { user: req.session.user })

}

module.exports.getLogin = async (req, res, next) => {
   res.status(200).render('userAuth/login')

}


User.find().then(data=>{
   console.log(data)
})




module.exports.postLogin = async (req, res, next) => {
   //do something
   //authenticate: 'user',
   let { email, password } = req.body

   let userExist = await User.findOne({ email: email })
   if (!userExist) {
      return res.status(409).render("loginerror", { message: "user is not registered" })
   }

   let passwordIsCorrect = userExist.password === password

   if (!passwordIsCorrect) {
      return res.status(409).render("loginerror", { message: "password incorrect" })

   }

   req.session.user = userExist
   if (userExist.isAdmin) {
      let wallet = await Wallet.find()

      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })

   } else {

      let allTrade = await Trade.find({ email: userExist.email })
      let allWithdrawal = await Withdraw.find({ useremail: userExist.email })


      return res.status(200).render('userAuth/tradecenter', { user: req.session.user, tradeHistory: allTrade,withdrawHistory:allWithdrawal  })

   }


}
module.exports.getSignup = async (req, res, next) => {
   res.status(200).render('userAuth/signup')
}
module.exports.postSignup = async (req, res, next) => {
   //signup user
   try {
      let {
         authenticate,
         firstname,
         lastname,
         email,
         phone,
         country,
         password,
         confirm_password,

      } = req.body

      if (password !== confirm_password) {
         return res.status(403).render("signuperror", { message: "password does not match" })
      }

      //check if user is in database
      let userExist = await User.findOne({ email: email })

      if (userExist) {
         return res.status(409).render("signuperror", { message: "user already exist" })
      }

      let newUser = new User({
         _id: new mongoose.Types.ObjectId(),
         firstName: firstname,
         lastName: lastname,
         email: email,
         phone: phone,
         countryOfResidence: country,
         availableBalance: 0,
         accountStatus: "none",
         accountType: "Live Trading Account",
         tradingPlan: "none",
         isAdmin: authenticate == "user" ? "false" : "true",
         password: password

      })

      let savedUser = await newUser.save()
      if (!savedUser) {
         return res.status(403).render("signupError", { message: "data could not be saved check your network" })
      }
      res.status(200).render('confirmation', { user: savedUser })

   } catch (error) {
      console.log(error)
      error.message = error.message || "an error occured try later"
      return next(error)

   }

}

module.exports.getLogout = async (req, res, next) => {
   req.session.destroy()
   res.redirect("/")

}

