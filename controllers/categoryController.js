const { body, validationResult } = require("express-validator");
const Items = require("../models/itemModel");
const expressAsyncHandler = require("express-async-handler");
const Categories = require("../models/categoryModel");

const categoryList = expressAsyncHandler(async (req, res, next) => {
	const categories = await Categories.find().exec();

	res.render("categoryList", { categories: categories });
});

const categoryPage = expressAsyncHandler(async (req, res, next) => {
    const name = req.params.category
	const items = await Items
		.find()
		.where("category")
		.equals(name)
		.exec();

    const category = await Categories.findOne().where("name").equals(name)

    res.render("categoryPage" , {items:items , category:category})
});

module.exports = {
	categoryList,
    categoryPage
};
