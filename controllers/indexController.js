const expressAsyncHandler = require("express-async-handler");
const Items = require("../models/itemModel")


const index = expressAsyncHandler( async(req,res,next)=> {
    const items = await Items.find().where("sold").gte(50).exec()

    res.render("itemsList", { items: items });
})

module.exports = {
    index
}