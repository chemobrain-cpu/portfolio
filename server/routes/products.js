const express = require('express')
const router = express.Router()
//importing controllers
const { verifyToken}  = require("../utils/util")

const { body, validationResult,Result } = require('express-validator')

const {getProducts,getProduct,getProductComment,getProductsCategory,readNotification } = require("../controller/product")


router.get("/products/:category",getProductsCategory)
router.get("/products",getProducts)
router.get("/product/:id",getProduct)
router.get("/comment/:id",getProductComment)
router.patch("/notification",readNotification)


module.exports.router = router
