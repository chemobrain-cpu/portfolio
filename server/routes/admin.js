const express = require('express')
const router = express.Router()
//importing controllers
const { verifyToken,verifyAdmin}  = require("../utils/util")

const { body} = require('express-validator')

const {signupAdmin,loginAdmin,addProduct,deleteProduct,editProduct,getAdmin,modifyAdmin,getAdminOrders,getAdminOrder,activateOrder,getUsers} = require("../controller/admin")

router.post("/adminSignup",[
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
],signupAdmin)

router.post("/adminLogin",[
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
   
],loginAdmin)
//add a new product
router.post("/addProduct",verifyAdmin,[
    body("productCategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("category is required"),
    body("productSubCategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("subcategory is required"),
    body("productAmount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("amount is required"),
    body("ProductName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is required"),
    body("negotiable")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
    body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
  
],addProduct)
router.delete("/deleteProduct/:id",verifyAdmin,deleteProduct)
router.patch("/editProduct/:id",[
    body("productCategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("category is required"),
    body("productSubCategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("subcategory is required"),
    body("productAmount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("amount is required"),
    body("ProductName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is required"),
    body("negotiable")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
    body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required"),
  
],verifyAdmin,editProduct)
router.get("/admin",verifyAdmin,getAdmin)
router.patch("/admin",verifyAdmin,modifyAdmin)
router.get("/adminorders",verifyAdmin,getAdminOrders)
router.get("/adminorder/:orderid",verifyAdmin,getAdminOrder)
router.get("/activateorder/:orderid",verifyAdmin,activateOrder)
router.get("/users",verifyAdmin,getUsers)




module.exports.router = router
