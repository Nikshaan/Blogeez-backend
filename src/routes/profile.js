const express = require("express");
const User = require("../models/user");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/authorisation");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view/:userId", userAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request!");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully!`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;