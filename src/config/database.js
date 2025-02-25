const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://nikshaan:1UCL7768op17hpVe@cluster0.r21rp.mongodb.net/blogeez");
};

module.exports = connectDB;