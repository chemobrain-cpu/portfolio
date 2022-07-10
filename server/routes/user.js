const express = require('express')
const router = express.Router()
//importing controllers

const { verifyToken}  = require("../utils/util")



const {makePayment,getOrders,getOrder,getUser,modifyUser,getUserOrders} = require("../controller/user")


router.post("/pay",verifyToken,makePayment)
router.get("/orders",verifyToken,getOrders)
router.get("/userorders/:id",verifyToken,getUserOrders)
router.get("/order/:orderid",verifyToken,getOrder)
router.get("/user",verifyToken,getUser)
router.patch("/user",verifyToken,modifyUser)


module.exports.router = router