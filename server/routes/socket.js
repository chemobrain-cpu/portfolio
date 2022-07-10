const mongoose = require('mongoose')
//importing models
const { Product, User, Admin, Comment, Order, CommentReply } = require("../database/database")
//import {env} from "../enviroment"
const jwt = require("jsonwebtoken")
const { generateAcessToken } = require('../utils/util')
const uuid = require("uuid")

module.exports = async (io) => {
    io.on('connection', async (socket) => {
        //sending main comment
        socket.on("sendMainComment", async (objData) => {
            //sendMainComment(data,socket)

            //destructuring
            let { user, data } = objData
            //destructuring data
            let { id: productId, comment } = data
            try {
                if (!user) {
                    return
                }
                if (user && user.admin) {
                    //user is an admin
                    //checking if product exist
                    let productExist = await Product.findOne({ _id: productId }).populate("usersToNotify").populate("adminToNotify")

                    if (!productExist) {
                        socket.emit("error", "no product")
                        return
                    }
                    //checking if user Exist
                    let userExist = await Admin.findOne({ _id: user._id })
                    if (!userExist) {
                        socket.emit("error", "no user")
                        return
                    }
                    //then creating a new comment
                    let newComment = new Comment({
                        _id: new mongoose.Types.ObjectId(),
                        text: comment,
                        admin: userExist,
                        replies: [],
                        isAdmin: true,
                        date: Date.now(),
                        product: productExist
                    })
                    //savong the created comment
                    let savedComment = await newComment.save()
                    if (!savedComment) {
                        socket.emit("error", "comment could not be saved")
                        return
                    }
                    //add the created comment to the products comment field on the front-end
                    socket.emit("comment", savedComment)




                    //modify the admin to notify field by always initialising this field to all admin
                    let admins = await Admin.find()
                    productExist.adminToNotify = admins




                    //make changes to product model
                    let modifyProduct = await productExist.save()
                    if (!modifyProduct) {
                        socket.emit("error", "could not modify product")
                        return
                    }
                    //then loop through all users to be notified,and create a notification to add to all their field
                    let notification = {
                        //user who post the product
                        id:uuid.v1(),
                        admin: userExist,
                        idOfProduct: productId,
                        date: Date.now(),
                        status: "unread",
                        photo: user.photo,
                        isAdmin: true,
                        text: " commented on the product",
                        linkId: modifyProduct._id,
                        photo: userExist.photo,
                        username:userExist.username
                
                    }
                    //get all admins in the notify fie;d of product and add the created notification to them
                    let adminInProductNotify = []
                    for (let mem of productExist.adminToNotify) {
                        //push notofications to admin except the admin doing it 
                        if (mem._id.toString() !== userExist._id.toString()) {
                            mem.notifications.push(notification)
                        }
                        adminInProductNotify.push(mem)

                        await mem.save()
                    }

                    //get all users in the notify fie;d of product and add the created notification to them
                    let usersInProductNotify = []
                    for (let mem of productExist.usersToNotify) {

                        if (mem) {
                            mem.notifications.push(notification)
                            usersInProductNotify.push(mem)
                            await mem.save()
                        }
                    }
                    //find the particular admin
                    const userToSend = await Admin.findOne({_id:userExist._id}).populate({
                        path: "notifications",
                        populate: {
                            path: "user",
                            model: "User",
                        }
                    }).populate({
                        path: "notifications",
                        populate: {
                            path: "admin",
                            model: "Admin",
                        }
                    })

                    socket.broadcast.emit("notifications", { notification, adminInProductNotify, usersInProductNotify,user:userToSend, isAdmin: true, })


                } else if (user) {
                    //checking if product exist
                    let productExist = await Product.findOne({ _id: productId }).populate("usersToNotify").populate("adminToNotify")

                    if (!productExist) {
                        socket.emit("error", "no product")
                        return
                    }
                    //checking if user Exist
                    let userExist = await User.findOne({ _id: user._id })
                    if (!userExist) {
                        socket.emit("error", "no user")
                        return
                    }
                    //then creating a new comment
                    let newComment = new Comment({
                        _id: new mongoose.Types.ObjectId(),
                        text: comment,
                        user: userExist,
                        replies: [],
                        date: Date.now(),
                        isAdmin: false,
                        product: productExist
                    })
                    //savong the created comment
                    let savedComment = await newComment.save()
                    if (!savedComment) {
                        socket.emit("error", "comment could not be saved")
                        return
                    }
                    socket.emit("comment", savedComment)
                    //add the created comment to the products comment field
                    productExist.comment.push(savedComment)
                    //check if the user exist in the userToNotify field of the product
                    let notifyUsers = productExist.usersToNotify
                    let notifyUsersExist = []
                    for (let mem of notifyUsers) {
                        if (mem.toString() === userExist.toString()) {
                            notifyUsersExist.push(mem)
                        }
                    }
                    if (notifyUsersExist.length == 0) {
                        productExist.usersToNotify.push(userExist)
                    }

                    //modify the admin to notify field by always initialising this field to all admin
                    let admins = await Admin.find()
                    productExist.adminToNotify = admins
                    //make changes to user model
                    let modifyProduct = await productExist.save()
                    if (!modifyProduct) {
                        socket.emit("error", "could not modify product")
                        return
                    }
                    //then loop through all users to be notified,and create a notification to add to all their field
                    let notification = {
                        id:uuid.v1(),
                        user: user,
                        idOfProduct: productId,
                        date: Date.now(),
                        status: "unread",
                        isAdmin: false,
                        text: ` commented on  the product`,
                        linkId: modifyProduct._id,
                        username:userExist.username
                    }
                    //get all users in the notify fie;d of product and add the created notification to them
                    let usersInProductNotify = []
                    for (let mem of productExist.usersToNotify) {
                        //push notification to every user
                        if (mem._id.toString() !== userExist._id.toString()) {
                            mem.notifications.push(notification)
                        }
                        usersInProductNotify.push(mem)
                        await mem.save()
                    }
                    //notify all admin too
                    let allAdmin = await Admin.find()
                    for (let mem of allAdmin) {
                        //let member = await User.findOne({_id:mem._id})
                        mem.notifications.push(notification)
                        await mem.save()
                    }
                    //find the particular user
                    const userToSend = await User.findOne({_id:userExist._id}).populate({
                        path: "notifications",
                        populate: {
                            path: "user",
                            model: "User",
                        }
                    }).populate({
                        path: "notifications",
                        populate: {
                            path: "admin",
                            model: "Admin",
                        }
                    })
                    socket.broadcast.emit("notifications", { notification, usersInProductNotify, adminInProductNotify: allAdmin,user:userToSend,isAdmin: false })
                }
            } catch (error) {
                console.log(error)
                socket.emit("error", "network error")
                return

            }
        })
        //sending reply comment
        socket.on("sendReplyComment", async (objData) => {
            //destructuring
            let { comment: text, id: commentId, user } = objData
            try {
                if (user && user.admin) {
                    //find the main comment "
                    let commentExist = await Comment.findOne({ _id: commentId }).populate("product")
                    if (!commentExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }

                    //find the product if it exist
                    let productExist = await Product.findOne({ _id: commentExist.product }).populate("usersToNotify").populate("adminToNotify")

                    if (!productExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }


                    //find the user "
                    let userExist = await Admin.findOne({ _id: user._id })
                    if (!userExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }
                    //create a replyComment instance
                    let replyComment = new CommentReply({
                        _id: new mongoose.Types.ObjectId(),
                        text: text,
                        admin: userExist,
                        isAdmin: true,
                        date: Date.now(),
                        comment: commentExist
                    })

                    let newReplyComment = await replyComment.save()
                    if (!newReplyComment) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }
                    //add the created reply to the main comment reply field


                    commentExist.replies.push(newReplyComment)

                    let modifiedComment = await commentExist.save()
                    if (!modifiedComment) {
                        //throw socket error
                        socket.emit("error", "network error")

                    }
                    //modify the admin to notify field by always initialising this field to all admin
                    let admins = await Admin.find()
                    productExist.adminToNotify = admins

                    let modifiedProduct = await productExist.save()
                    if (!modifiedProduct) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }
                    //create a notification
                    let notification = {
                        id:uuid.v1(),
                        admin: userExist,
                        idOfProduct: modifiedProduct._id,
                        date: Date.now(),
                        status: "unread",
                        photo: userExist.photo,
                        isAdmin: true,
                        text: "replied to a comment on the product",
                        linkId: modifiedProduct._id,
                        username:userExist.username
                    }

                    //add the notiifcation for all users and admin to pussh to their notification field
                    for (let mem of productExist.adminToNotify) {
                        //push notification to all admin except the admin
                        if (mem._id.toString() !== userExist._id.toString()) {
                            mem.notifications.push(notification)
                        }
                        //save 
                        await mem.save()
                    }
                    let usersInProductNotify = []
                    for (let mem of productExist.usersToNotify) {
                        if (mem) {
                            usersInProductNotify.push(mem)
                            mem.notifications.push(notification)
                            //save
                            await mem.save()
                        }
                    }
                    //finally notify them all
                    let commentToSend = await Comment.findOne({ _id: modifiedComment._id }).populate("user").populate("admin").populate({
                        path: "replies",
                        populate: {
                            path: "user",
                            model: "User"
                        }
                    }).populate({
                        path: "replies",
                        populate: {
                            path: "admin",
                            model: "Admin"
                        }
                    })

                    socket.emit("replyResult", commentToSend)

                    socket.broadcast.emit("notifications", { notification, usersInProductNotify, adminInProductNotify: admins, isAdmin: true })

                    return;

                } else if (user) {

                    //find the main comment "
                    let commentExist = await Comment.findOne({ _id: commentId }).populate("product")
                    if (!commentExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }
                    //find the product if it exist
                    let productExist = await Product.findOne({ _id: commentExist.product }).populate("usersToNotify").populate("adminToNotify")

                    if (!productExist) {
                        //throw socket error
                        return socket.emit("error", "network error")
                    }
                    //find the user "
                    let userExist = await User.findOne({ _id: user._id })
                    if (!userExist) {
                        //throw socket error
                        return socket.emit("error", "network error")
                    }
                    //create a replyComment instance
                    let replyComment = new CommentReply({
                        _id: new mongoose.Types.ObjectId(),
                        text: text,
                        user: userExist,
                        isAdmin: false,
                        date: Date.now(),
                        comment: commentExist
                    })

                    //create a replyComment instance

                    let newReplyComment = await replyComment.save()


                    if (!newReplyComment) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }


                    //add the created reply to the main comment reply field
                    commentExist.replies.push(newReplyComment)

                    let modifiedComment = await commentExist.save()
                    if (!modifiedComment) {
                        //throw socket error
                        socket.emit("error", "network error")
                    }

                    //check if the user is part and if not paert, add him
                    let userIsMeber = []

                    //if user can be notified then nothing
                    for (let mem of productExist.usersToNotify) {
                        if (mem._id.toString() === userExist._id.toString()) {
                            userIsMeber.push(userExist)
                        }
                    }
                    //if user can be notified then nothing
                    if (userIsMeber.length === 0) {
                        productExist.usersToNotify.push(userExist)
                    }

                    //modify the admin to notify field by always initialising this field to all admin
                    let admins = await Admin.find()

                    productExist.adminToNotify = admins


                    let modifiedProduct = await productExist.save()
                    if (!modifiedProduct) {
                        //throw socket error
                    }
                    //create a notification
                    let notification = {
                        id:uuid.v1(),
                        user: userExist,
                        idOfProduct: modifiedProduct._id,
                        date: Date.now(),
                        status: "unread",
                        photo: userExist.photo,
                        isAdmin: false,
                        text: ` replied to the comment`,
                        linkId: modifiedProduct._id,
                        username:userExist.username
                    }

                    //add the notiifcation for all users and admin to pussh to their notification field
                    let usersInProductNotify = []
                    for (let mem of productExist.adminToNotify) {
                        //push notification to all user except the poster

                        mem.notifications.push(notification)

                        //save 
                        await mem.save()
                    }
                    for (let mem of productExist.usersToNotify) {
                       
                        usersInProductNotify.push(mem)
                        // modifying the notification here
                        if (mem._id.toString() !== userExist._id.toString()) {
                            mem.notifications.push(notification)
                        }
                        await mem.save()
                    }

                    //finally notify them all
                    let commentToSend = await Comment.findOne({ _id: modifiedComment._id }).populate("user").populate("admin").populate({
                        path: "replies",
                        populate: {
                            path: "user",
                            model: "User"
                        }
                    }).populate({
                        path: "replies",
                        populate: {
                            path: "admin",
                            model: "Admin"
                        }
                    })
                    socket.emit("replyResult", commentToSend)

                    socket.broadcast.emit("notifications", { notification, usersInProductNotify, adminInProductNotify: admins, isAdmin: false })
                    return;
                }
            } catch (error) {
                console.log(error)
                socket.emit("error", "network error")
                return

            }
        })
        //deleting main comment
        socket.on("deleteComment", async (objData) => {
            try {
                let { commentId, userId, user } = objData

                if (user && user.admin) {
                    //find the commeent

                    let commentExist = await Comment.findOne({ _id: commentId }).populate("user").populate("admin").populate({
                        path: "replies",
                        populate: {
                            path: "user",
                            model: "User"
                        }
                    }).populate({
                        path: "replies",
                        populate: {
                            path: "admin",
                            model: "Admin"
                        }
                    })
                    if (!commentExist) {
                        //throw socket error
                        console.log("no comment")
                    }

                    //find the product the comment was made on 
                    let productExist = await Product.findOne({ _id: commentExist.product }).populate("usersToNotify").populate("adminToNotify").populate("comment")

                    if (!productExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                        console.log("no product")
                    }

                    //find the user trying the deleting request
                    let userExist = await Admin.findOne({ _id: userId })

                    if (!userExist) {
                        //throw socket error
                        console.log("user does not exist")
                        socket.emit("error", "network error")
                    }
                    if (commentExist.admin._id.toString() !== userExist._id.toString()) {
                        //cannot proceed with the delete algorithm
                        //throw socket error
                        console.log("not authoried")
                        socket.emit("error", "network error")
                        return
                    }

                    //remove the comment from the product field
                    let commentsOfProduct = productExist.comment
                    let filteredCommentsOfProduct = []
                    for (let mem of commentsOfProduct) {
                        if (mem._id !== commentExist._id) {
                            filteredCommentsOfProduct.push(mem)
                        }
                    }
                    productExist.comment = filteredCommentsOfProduct
                    //modify the product
                    let savedProduct = await productExist.save()
                    if (!savedProduct) {
                        //throw socket error
                        console.log("not saved")
                        socket.emit("error", "network error")
                    }
                    //deleting the comment now
                    let deletedComment = await Comment.deleteOne({ _id: commentExist._id })

                    if (!deletedComment) {
                        //throw socket error
                        console.log("comment deleted")
                        socket.emit("error", "network error")
                    }
                    //send response back
                    socket.emit("deletedComment")



                } else if (user) {
                    //find the commeent

                    let commentExist = await Comment.findOne({ _id: commentId }).populate("user").populate("admin").populate({
                        path: "replies",
                        populate: {
                            path: "user",
                            model: "User"
                        }
                    }).populate({
                        path: "replies",
                        populate: {
                            path: "admin",
                            model: "Admin"
                        }
                    })
                    if (!commentExist) {
                        //throw socket error
                        console.log("no comment")
                    }

                    //find the product the comment was made on 
                    let productExist = await Product.findOne({ _id: commentExist.product }).populate("usersToNotify").populate("adminToNotify").populate("comment")

                    if (!productExist) {
                        //throw socket error
                        socket.emit("error", "network error")
                        console.log("no product")
                    }

                    //find the user trying the deleting request
                    let userExist = await User.findOne({ _id: userId })

                    if (!userExist) {
                        //throw socket error
                        console.log("user does not exist")
                        socket.emit("error", "network error")
                    }
                    if (commentExist.user._id.toString() !== userExist._id.toString()) {
                        //cannot proceed with the delete algorithm
                        //throw socket error
                        console.log("not authoried")
                        socket.emit("error", "network error")
                        return
                    }

                    //remove the comment from the product field
                    let commentsOfProduct = productExist.comment
                    let filteredCommentsOfProduct = []
                    for (let mem of commentsOfProduct) {
                        if (mem._id !== commentExist._id) {
                            filteredCommentsOfProduct.push(mem)
                        }
                    }
                    productExist.comment = filteredCommentsOfProduct
                    //modify the product
                    let savedProduct = await productExist.save()
                    if (!savedProduct) {
                        //throw socket error
                        console.log("not saved")
                        socket.emit("error", "network error")
                    }
                    //deleting the comment now
                    let deletedComment = await Comment.deleteOne({ _id: commentExist._id })

                    if (!deletedComment) {
                        //throw socket error
                        console.log("comment deleted")
                        socket.emit("error", "network error")
                    }
                    //send response back
                    socket.emit("deletedComment")

                }
            } catch (error) {
                console.log(error)
            }
        })
        //deleting reply comment
        socket.on("deleteReplyComment", async (objData) => {
            try {
                let { replyCommentId, user } = objData
                if (user && user.admin) {
                    //check if the user exist
                    let userExist = await Admin.findOne({ _id: user._id })
                    if (!userExist) {
                        //user does not exist
                    }
                    //check if the replyComment exist
                    let replyCommentExist = await CommentReply.findOne({ _id: replyCommentId }).populate("user").populate("admin").populate("comment")

                    if (!replyCommentExist) {
                        //replyComment does not exist
                    }
                    //check if comment exist
                    let commentExist = await Comment.findOne({ _id: replyCommentExist.comment._id }).populate("product")

                    if (!commentExist) {
                        //comment does not exist

                    }
                    //check if the product exist

                    let productExist = await Product.findOne({ _id: commentExist.product._id })

                    if (!productExist) {
                        //product does not exist

                    }

                    //check if the user performing deleting is the owner of reply
                    if (userExist._id.toString === replyCommentExist.admin._id) {
                        //you cannot delete this replycomment
                    }
                    //remove from the replies of main comment
                    let replies = commentExist.replies

                    let filteredReplies = []
                    for (let mem of replies) {
                        if (mem._id.toString() !== replyCommentExist._id.toString()) {
                            filteredReplies.push(mem)
                        }
                    }
                    commentExist.replies = filteredReplies
                    let savedComment = await commentExist.save()
                    if (!savedComment) {
                        //cannot save

                    }
                    //deleting the reply
                    let deletedReply = await CommentReply.deleteOne({ _id: replyCommentExist._id })
                    if (!deletedReply) {
                        //couldnt delete
                    }
                    socket.emit("deleteReplyCommentSucess", savedComment._id)



                } else if (user) {
                    //check if the user exist
                    let userExist = await User.findOne({ _id: user._id })
                    if (!userExist) {
                        //user does not exist
                    }
                    //check if the replyComment exist
                    let replyCommentExist = await CommentReply.findOne({ _id: replyCommentId }).populate("user").populate("admin").populate("comment")

                    if (!replyCommentExist) {
                        //replyComment does not exist
                    }
                    //check if comment exist
                    let commentExist = await Comment.findOne({ _id: replyCommentExist.comment._id }).populate("product")

                    if (!commentExist) {
                        //comment does not exist

                    }
                    //check if the product exist

                    let productExist = await Product.findOne({ _id: commentExist.product._id })

                    if (!productExist) {
                        //product does not exist

                    }

                    //check if the user performing deleting is the owner of reply
                    if (userExist._id.toString === replyCommentExist.user._id) {
                        //you cannot delete this replycomment
                    }
                    //remove from the replies of main comment
                    let replies = commentExist.replies

                    let filteredReplies = []
                    for (let mem of replies) {
                        if (mem._id.toString() !== replyCommentExist._id.toString()) {
                            filteredReplies.push(mem)
                        }
                    }
                    commentExist.replies = filteredReplies
                    let savedComment = await commentExist.save()
                    if (!savedComment) {
                        //cannot save

                    }
                    //deleting the reply
                    let deletedReply = await CommentReply.deleteOne({ _id: replyCommentExist._id })
                    if (!deletedReply) {
                        //couldnt delete
                    }
                    socket.emit("deleteReplyCommentSucess", savedComment._id)

                }
            } catch (error) {
                console.log(error)
            }
        })
    })

}


/*
Product.deleteMany().then(data=>{
    console.log(data)
})
User.deleteMany().then(data=>{
    console.log(data)
})
Admin.deleteMany().then(data=>{
    console.log(data)
})
Comment.deleteMany().then(data=>{
    console.log(data)
})
Order.deleteMany().then(data=>{
    console.log(data)
})
CommentReply.deleteMany().then(data=>{
    console.log(data)
})
*/













