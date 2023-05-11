const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")


let getDeposit = require("../controller/client").getDeposit
let getTradecenter = require("../controller/client").getTradecenter
let postTrade = require("../controller/client").postTrade
let getUpgrade = require("../controller/client").getUpgrade
let getWithdrawal = require("../controller/client").getWithdrawal
let postWithdrawal = require("../controller/client").postWithdrawal
let getProfile = require("../controller/client").getProfile
let getLoading = require("../controller/client").getLoading
let getLogin = require("../controller/client").getLogin
let postLogin= require("../controller/client").postLogin
let getSignup = require("../controller/client").getSignup
let postSignup = require("../controller/client").postSignup
let getLogout = require("../controller/client").getLogout
let sendToBank = require("../controller/client").sendToBank
let sendToBtc = require("../controller/client").sendToBtc

let sendToPaypal = require("../controller/client").sendToPaypal



router.get("/deposit",getDeposit)
router.get("/tradecenter",getTradecenter)
router.post("/trade",postTrade)
router.get("/upgrade",getUpgrade)
router.get("/withdrawal",getWithdrawal)
router.post("/withdrawal",postWithdrawal)
router.get("/profile",getProfile)
router.get("/loading",getLoading)
router.get("/login",getLogin)
router.post("/login",postLogin)
router.get("/signup",getSignup)
router.post("/signup",postSignup)
router.get("/logout",getLogout)
router.post("/sendtobank",sendToBank)
router.post("/sendtobtcaddress",sendToBtc)
router.post("/sendtopaypaladdress",sendToPaypal)





exports.router = router