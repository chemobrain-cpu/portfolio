const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")


let getLogin = require("../controller/admin").getLogin
let getSignup = require("../controller/admin").getSignup
let getProfile = require("../controller/admin").getProfile
let getUserDetails = require("../controller/admin").getUserDetails
let postUserDetails = require("../controller/admin").postUserDetails
let getUsers = require("../controller/admin").getUsers
let getWallet= require("../controller/admin").getWallet
let  postWallet = require("../controller/admin").postWallet

router.get("/adminlogin",getLogin)
router.get("/adminsignup",getSignup)
router.get("/adminprofile",getProfile)
router.get("/users/:id",getUserDetails)
router.post("/users",postUserDetails)
router.get("/wallet",getWallet)
router.post("/wallet",postWallet)

router.get("/adminusers",getUsers)





exports.router = router