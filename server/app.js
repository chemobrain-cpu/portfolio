require('dotenv').config()
const app = require('express')();
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
app.use( bodyParser.json())
const path = require("path")
const { body, validationResult } = require('express-validator')
const compression = require('compression')
const {Server} = require('socket.io')
let server = require('http').createServer(app)
let io = new Server(server,{
    cors:{
        origin:"*",
        methods:['GET','POST','PATCH'],
    }
})

app.use(cors())
app.use( bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//configuring database

mongoose.connect(process.env.DB_STRING,()=>{
    console.log("connected")
})
//mongodb://127.0.0.1:27017/EazkonDB

//configuring multer

let dir = './public'
const multerStorage = multer.diskStorage({
    destination:dir,
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '_' + file.originalname)
    }
 })

app.use(multer({storage:multerStorage}).single('photo'))
app.use('/public',express.static(path.join(__dirname,'/public/')))

//requiring our socket middleware
require("./routes/socket.js")(io)

//importing auth  routes
const  signupRoutes = require("./routes/auth").router
const  AdminSignupRoutes = require("./routes/admin").router
const  ProductsRoutes = require("./routes/products").router
const  UserRoutes = require("./routes/user").router
app.use(signupRoutes)
app.use(AdminSignupRoutes)
app.use(ProductsRoutes)
app.use(UserRoutes)

__dirname = path.resolve()
if(process.env.NODE === "production"){
    app.use(express.static(path.join(__dirname,'../client/build')))
    

    app.use("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../client","build","index.html"))
    })
}



//express error middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 300
    err.message = err.message || "an error occured on the server"
    res.status(err.statusCode).json({response:err.message})
})


server.listen(process.env.PORT,()=>{
    console.log("listening on port 8080")
})
