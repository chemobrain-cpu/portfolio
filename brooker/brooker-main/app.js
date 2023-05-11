require("dotenv").config()
const express = require("express")
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const User = require("./database/databaseConfig").User
const session = require("express-session");
const mongoose = require("mongoose")
app.use(express.static("public"));
app.use("/",express.static("public"));


//setting express to use  the session
app.use(session({
    secret:"mylittlesecret",
    resave:false,
    saveUninitialized:false,
    name:"precious",
    genid:function(){
        return "prechy"
    },
    cookie:{
        maxAge:7800000000000
    }, 
}))

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req,res,next){
    if(req.path.substr(-1) == '/' && req.path.length > 1){
        const query = req.url.slice(req.path.length);
        res.redirect(req.path.slice(0,-1) + query)
    }else{
        next()
    }
})

const pageRoutes = require("./routes/pages")
const clientRoutes = require("./routes/client")
const adminRoutes = require("./routes/admin")

//using the routes

app.use(pageRoutes.router)
app.use(clientRoutes.router)
app.use(adminRoutes.router)

//error handler //express error middleware
app.use((err,req,res,next)=>{
     console.log(err)
    err.statusCode = err.statusCode || 300
    err.message = err.message 
    res.status(err.statusCode).render("error",{message:err.message})
})
app.use("*",(req,res,next)=>{
    res.render("home")
})


app.listen(process.env.PORT||3005,(err)=>{
   
    console.log("sucessfully")
})
