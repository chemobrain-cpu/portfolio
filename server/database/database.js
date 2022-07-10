const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    notifications: [{
        id:{
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text:{
            type: String,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        },
        isAdmin:{
            type: Boolean,
            required: true
        },
        idOfProduct: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: true,
            default:Date.now()
        },
        status: {
            type: String,
            required: true
        },
        linkId: {
            type: String,
            required: true
        },
        photo: {
            type: String,
        },
        username:{
             type: String,
        }

    }],
    

})
const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            no: "",
            amount: "",
        }
    ],
    totalNo: "",
    totalAmount: "",
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shipping_address: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
    },
    dateOfOrder: {
        type: Date,
        required: true,
        default: Date.now().toString()
    },
    trackerId: {
        type: String,
        default: Math.round(Math.random() * 100000000000)

    },
    status: {
        type: String,
        default: "pending"
    }
})
const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    photos: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    NameOfProduct: {
        type: String,
        required: true
    },
    negotaible: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    usersToNotify: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    adminToNotify: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    
})
const AdminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },],
    email: {
        type: String,
        required: true

    },
    country: {
        type: String,
        required: true

    },
    state: {
        type: String,
        required: true

    },
    admin: {
        type: Boolean,
        default: true

    },
    notifications: [{
        id:{
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text:{
            type: String,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        },
        isAdmin:{
            type: Boolean,
            required: true
        },
        idOfProduct: {
            type: String,
            required: true
        },
        date:{
            type:Date,
            required: true,
            default:Date.now()
        },
        status: {
            type: String,
            required: true
        },
        linkId: {
            type: String,
            required: true
        },
        photo: {
            type: String,
        },
        username:{
             type: String,

        }

    }],


})
const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentReply"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
})
const CommentReplySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },

})

module.exports.Comment = mongoose.model("Comment", CommentSchema)
module.exports.CommentReply = mongoose.model("CommentReply", CommentReplySchema)
module.exports.User = mongoose.model("User", UserSchema)
module.exports.Order = mongoose.model("Order", OrderSchema)
module.exports.Product = mongoose.model("Product", ProductSchema)
module.exports.Admin = mongoose.model("Admin", AdminSchema)



