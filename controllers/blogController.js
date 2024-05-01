const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');


// CREATE BLOG 
exports.crateBlogController = async (req, res) => {
    try {
        const { blog } = await blogModel.find({});
        const { title, description, image, user } = req.body;
        // validation 
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: `Please fill the details correctly`
            })
        }
        const existingUser = await userModel.findById(user)
        // validation 
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: `User not Exist`
            })
        }
        const newBlog = new blogModel({ title, description, image })

        // create session
        const session = await mongoose.startSession();
        session.startTransaction();

        // save data
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();

        return res.status(200).send({
            success: true,
            message: `Blog added successfully`,
            newBlog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}


// GET ALL BLOG 
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find().populate("user");
        if (!blogs) {
            return res.status(400).send({
                success: false,
                message: `Not Data Found`
            })
        } else {
            return res.status(200).send({
                success: true,
                blogCount: blogs.length,
                blogs: blogs
            })
        }

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}

// GET BLOG BY ID 
exports.getBlogIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blogs = await blogModel.findById(id);

        if (!blogs) {
            return res.status(400).send({
                success: false,
                message: `Not Data Found`
            })
        } else {
            return res.status(200).send({
                success: true,
                blogCount: blogs.length,
                blogs: blogs
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}

// UPDATE BLOG 
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;

        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog updated",
            blog: blog
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}

// GET USER BLOG 
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(400).send({
                success: false,
                message: "Blog not fount with this id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User blog",
            userBlog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}

// DELETE BLOG 
exports.deleteBlogController = async (req, res) => {
    try {

        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success: true,
            message: "Blog deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error ocure ${error}`
        })
    }
}