const express = require("express");
const { index } = require("../controllers/indexController");
const { itemList, itemPage } = require("../controllers/itemController");
const router = express.Router();

/* GET home page. */
router.get("/", index);

/* Item routes */

router.get("/items" , itemList);
router.get("/items/:item" ,itemPage);
router.get("/items/:item/update");
router.get("/items/:item/delete");
router.get("/items/create");


/* Category routes */
router.get("/categories")
router.get("/categories/create")
router.get("/categories/:category")
router.get("/categories/:category/delete")
router.get("/categories/:category/update")


module.exports = router;
