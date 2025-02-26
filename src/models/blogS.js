const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLen: 4,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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