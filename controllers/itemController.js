const Items = require("../models/itemModel")
const expressAsyncHandler = require("express-async-handler")


const itemList = expressAsyncHandler(async(req,res,next) => {
    const items = await Items.find().exec()

    res.render("itemsList" , {items:items});
})

const itemPage = expressAsyncHandler(async(req,res,next) => {
    const id = req.params.item

    const item = await Items.findOne().where("_id").equals(id).exec()
    res.render("itemPage" , {item:item})
})

const itemDelete = expressAsyncHandler(async(req,res,next) => {
    const id = req.params.item

    await Items.deleteOne().where("_id").equals(id).exec()

    res.redirect("/")
})

module.exports = {
    itemList,
    itemPage,
    itemDelete
}