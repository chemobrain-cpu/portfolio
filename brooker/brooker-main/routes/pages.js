const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")


let gethome = require("../controller/pages").gethome
let getAbout = require("../controller/pages").getAbout
let getMarket = require("../controller/pages").getMarket
let getContact = require("../controller/pages").getContact
let getConfirmation = require("../controller/pages").getConfirmation


router.get("/",gethome)
router.get("/info",getAbout)
router.get("/market",getMarket)
router.get("/contact",getContact)
router.get("/confirmation",getConfirmation)





exports.router = router