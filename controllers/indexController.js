const expressAsyncHandler = require("express-async-handler");
const Items = require("../models/itemModel")


const index = expressAsyncHandler( async(req,res,next)=> {
    const items = await Items.find().exec()

    res.render("index" , {items:items})
})

module.exports = {
    index
}