const mongoose = require("mongoose")

mongoose.connect(process.env.DB_STRING).then(() => {
    console.log("connected to database")
})

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,

    },
    countryOfResidence: {
        type: String,

    },
    availableBalance: {
        type: String,

    },
    accountStatus: {
        type: String,

    },
    accountType: {
        type: String,

    },
    tradingPlan: {
        type: String,
    },
    isAdmin: {
        type: Boolean
    },
    password: {
        type: String
    }


})


const TradeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    tradeType: {
        type: String,
    },
    planOfUser: {
        type: String,
    },
    amountToTrade: {
        type: String
    },
    dateOfTrade: {
        type: String
    },
    status: {
        type: String
    }


})

const WithdrawSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    withdrawType: {
        type: String,
    },
    email:{
        type:String
    },
    btcAddress: {
        type: String,
    },
    bank_name: {
        type: String,
    },
    acct_no: {
        type: String,
    },
    acct_name: {
        type: String,
    },
    acct_swift: {
        type: String,
    },
    bank_location: {
        type: String,
    },
    amount: {
        type: String,
    },
    withdraw: {
        type: String,
    },
    Date:{
        type:String
    },
    useremail:{
        type:String
    }




})

const walletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: {
        type: String
    }
})




let User = new mongoose.model("user", userSchema)
let Wallet = new mongoose.model("wallet", walletSchema)
let Trade = new mongoose.model('Trade', TradeSchema)
let Withdraw  = new mongoose.model('Withdraw',WithdrawSchema )
module.exports.User = User
module.exports.Wallet = Wallet
module.exports.Trade = Trade
module.exports.Withdraw  = Withdraw