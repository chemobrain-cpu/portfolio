const express = require('express')
const router = express.Router()
//importing controllers
const { verifyToken}  = require("../utils/util")

const { body, validationResult,Result } = require('express-validator')

const {signupUser,loginUser,getUser,getUserFromJwt,getAdminFromJwt} = require("../controller/auth")

router.post("/signup",[
    body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("username is required"),
    body("userEmail")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email is required"),
    body("userPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
    body("userCountry")
    .trim()
    .not()
    .isEmpty()
    .withMessage("country is required"),
    body("userState")
    .trim()
    .not()
    .isEmpty()
    .withMessage("state is required"),
    body("userPhoneNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("phone is required"),
],signupUser)

router.post("/login",[
    body("userEmail")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email is required"),
    body("userPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
   
],loginUser)
router.get("/user/:id",getUser)
router.get("/userByToken",getUserFromJwt)
router.get("/adminByToken",getAdminFromJwt)





module.exports.router = router
