const express = require("express");
const { index } = require("../controllers/indexController");
const { itemList, itemPage, itemDelete, itemUpdateGet, itemUpdatePost, itemCreateGet, itemCreatePost } = require("../controllers/itemController");
const { categoryList, categoryPage, categoryDelete, categoryUpdateGet, categoryUpdatePost } = require("../controllers/categoryController");
const router = express.Router();

/* GET home page. */
router.get("/", index);

/* Item routes */

router.get("/items" , itemList);
router.get("/items/create" ,itemCreateGet);
router.post("/items/create" ,itemCreatePost);
router.get("/items/:item" ,itemPage);
router.get("/items/:item/update" , itemUpdateGet);
router.post("/items/:item/update" , itemUpdatePost)
router.post("/items/:item/delete" , itemDelete);

/* Category routes */
router.get("/categories" ,categoryList)
router.get("/categories/:category" ,categoryPage)
router.get("/categories/create")
router.post("/categories/create");
router.post("/categories/:category/delete" , categoryDelete)
router.get("/categories/:category/update",categoryUpdateGet)
router.post("/categories/:category/update",categoryUpdatePost);


module.exports = router;
