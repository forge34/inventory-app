const { body, validationResult } = require("express-validator");
const Items = require("../models/itemModel");
const expressAsyncHandler = require("express-async-handler");
const Categories = require("../models/categoryModel");

const categoryList = expressAsyncHandler(async (req, res, next) => {
	const categories = await Categories.find().exec();

	res.render("categoryList", { categories: categories });
});

const categoryPage = expressAsyncHandler(async (req, res, next) => {
	const id = req.params.category;

	const c = await Categories.findOne().where("_id").equals(id).exec();

	const items = await Items.find().where("category").equals(c.name).exec();

	const category = await Categories.findOne().where("_id").equals(id);

	res.render("categoryPage", { items: items, category: category });
});

const categoryDelete = expressAsyncHandler(async (req, res, next) => {
	const id = req.params.category;
	const category = await Categories.findOne().where("_id").equals(id).exec();


	await Items.deleteMany({ category: id });
	await Categories.deleteOne({ name: category.name});

	res.redirect("/categories");
});

const categoryUpdateGet = expressAsyncHandler(async (req, res, next) => {
	res.render("categoryUpdate");
});

const categoryUpdatePost = [
	body("name").trim().isLength({ min: 1 }).escape(),
	body("name").trim().isLength({ min: 1 }).escape(),

	expressAsyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const name = req.body.name;
		const desc = req.body.description;
		const id = req.params.category;
		const category = await Categories.findOne().where("_id").equals(id).exec();


		if (errors.isEmpty()) {
			const newCategory = await Categories.findOne().where("name").equals(category.name)
				.exec();

			await Items.find().where("category").equals(category.name).updateMany({} ,{category:name}).exec()


			newCategory.name = name;
			newCategory.description = desc;

			await newCategory.save();
		}
		const url = req.url.split("update").join().replace
		(",","");
		res.redirect(url);
	}),
];

module.exports = {
	categoryList,
	categoryPage,
	categoryDelete,
	categoryUpdateGet,
	categoryUpdatePost
};
