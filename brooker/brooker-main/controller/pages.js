const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")
//const MongStore = require("connect-mongo")(session)
//let Passwordd = require("../data/databaseconfig").Password


//let Recovery = require("../data/databaseconfig").Recovery
//const Customers = require("../data/databaseconfig").Customer





module.exports.gethome = async (req,res)=>{ 
   
   //res.status(200).render('home',{no_recovered_cars:no_of_recoveries,no_of_users:no_of_users,data:data})
   res.status(200).render('home')
 
}
module.exports.getAbout = async (req,res)=>{ 
   
   //res.status(200).render('home',{no_recovered_cars:no_of_recoveries,no_of_users:no_of_users,data:data})
   res.status(200).render('about')
 
}

module.exports.getMarket = async (req,res)=>{ 
   
   //res.status(200).render('home',{no_recovered_cars:no_of_recoveries,no_of_users:no_of_users,data:data})
   res.status(200).render('marketdata')
 
}
module.exports.getContact = async (req,res)=>{ 
   
   //res.status(200).render('home',{no_recovered_cars:no_of_recoveries,no_of_users:no_of_users,data:data})
   res.status(200).render('contact')
 
}

module.exports.getConfirmation= async (req,res)=>{ 
   res.status(200).render('confirmation')
 
}


