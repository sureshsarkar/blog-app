const express = require('express');
const { getAllBlogController, getBlogIdController, crateBlogController, updateBlogController, deleteBlogController, userBlogController } = require('../controllers/blogController');

// router cbject 
const router = express.Router();

// router

// POST || create blog
router.post('/create-blog', crateBlogController);

// GET || all blogs
router.get('/all-blog', getAllBlogController)

// GET || get single blog
router.get('/get-blog/:id', getBlogIdController)

//PUT || update
router.put("/update-blog/:id", updateBlogController);

//GET || get user by user id blog
router.get("/user-blog/:id", userBlogController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);


module.exports = router