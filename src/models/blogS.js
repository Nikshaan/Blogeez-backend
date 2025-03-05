const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLen: 4,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    firstName: {
        type: String,
        minLen: 4,
        maxLen: 50,
    },
    lastName: {
        type: String,
        minLen: 4,
        maxLen: 50,
    },
    content: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;