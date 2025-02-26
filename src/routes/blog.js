const express = require("express");
const { userAuth } = require("../middlewares/authorisation");
const { validateEditBlogData } = require("../utils/validation");
const Blog = require("../models/blogS");

const blogRouter = express.Router();

blogRouter.post("/blog/create", userAuth, async (req, res) => {
    try {
    const  userId = req.user._id;
    const { title, content } = req.body;
    
    const blog = new Blog({
        title,
        userId,
        content,
    });

    const data = await blog.save();

    res.json({
        message: "Blog saved!",
        data,
    });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

blogRouter.get("/blog/view/:blogId", async(req, res) => {
    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        res.send(blog);

    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

blogRouter.patch("/blog/edit/:blogId", async (req, res) => {
    try {
        if(!validateEditBlogData(req)){
            throw new Error("Invalid edit request!");
        }

        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        Object.keys(req.body).forEach((key) => (blog[key] = req.body[key]));

        await blog.save();
        
        res.json({
            message: 'Blog edited successfully!',
            data: blog,
        });

    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

blogRouter.delete("/blog/delete/:blogId", async(req, res) => {
    try {
        const blogId = req.params.blogId;

        await Blog.findByIdAndDelete(blogId);

        res.json({
            message: 'Blog deleted successfully!',
        });

    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

blogRouter.get("/blogs/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const blogs = await Blog.find({userId : userId});

        res.send(blogs);



    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

blogRouter.get("/feed",async (req, res) => {
    try {
        const blogs = await Blog.find();
        
        res.json({ data: blogs });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });

module.exports = blogRouter;