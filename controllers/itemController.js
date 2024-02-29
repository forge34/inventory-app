const { body, validationResult } = require("express-validator");
const Items = require("../models/itemModel");
const expressAsyncHandler = require("express-async-handler");
const URL = require("node:url").URL

const itemList = expressAsyncHandler(async (req, res, next) => {
	const items = await Items.find().exec();

	res.render("itemsList", { items: items });
});

const itemPage = expressAsyncHandler(async (req, res, next) => {
	const id = req.params.item;

	const item = await Items.findOne().where("_id").equals(id).exec();
	res.render("itemPage", { item: item });
});

const itemDelete = expressAsyncHandler(async (req, res, next) => {
	const id = req.params.item;

	await Items.deleteOne().where("_id").equals(id).exec();

	res.redirect("/");
});

const itemUpdateGet = expressAsyncHandler(async (req, res, next) => {
	res.render("itemUpdate");
});

const itemUpdatePost = [
	body("name").trim().isLength({ min: 1 }).escape(),
	body("price").trim().isNumeric().escape(),

	expressAsyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const item = await Items.findOne().where("_id").equals(req.params.item).exec()
        if(errors.isEmpty()){
            item.name = req.body.name
            item.price = req.body.price
            await item.save()
        }

        res.redirect(req.url.replace(/update+/ , ""))
        //res.redirect()
    }),
];

module.exports = {
	itemList,
	itemPage,
	itemDelete,
	itemUpdateGet,
    itemUpdatePost
};
