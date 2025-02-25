const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
.then(() => {
    console.log("Database connected.");
    app.listen(7777, () => {
        console.log("Server is listening to port 7777...");
    });
})
.catch((err) => {
    console.error("Database cannot be connected."+err);
})