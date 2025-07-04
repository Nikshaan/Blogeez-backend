const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLen: 4,
            maxLen: 50,
        },
        lastName: {
            type: String,
            minLen: 4,
            maxLen: 50,
        },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address: " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if(!validator.isStrongPassword(value)) {
                    throw new Error("Enter a Strong Password: " + value);
                }
            },
        },
        age: {
            type: Number,
            min: 16,
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female", "other", "-"],
                message: `{VALUE} is not a valid gender type!`,
            },
            default:"-"
        },
        photoUrl: {
            type: String,
            default: "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg",
            validate(value) {
              if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value);
              }
            },
        },
        about: {
            type: String,
            default: "This is my default about!",
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);