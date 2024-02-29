const { body, validationResult } = require("express-validator");
const Items = require("../models/itemModel");
const expressAsyncHandler = require("express-async-handler");
const Categories = require("../models/categoryModel");


const categoryList = expressAsyncHandler(async(req,res,next) => {
    const categories = await Categories.find().exec()

    res.render("categoryList" , {categories:categories})
})

module.exports = {
    categoryList
}