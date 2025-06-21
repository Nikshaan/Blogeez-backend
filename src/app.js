const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const blogRouter = require("./routes/blog");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 7777;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", blogRouter);

connectDB()
.then(() => {
    console.log("Database connected.");
    app.listen(port, () => {
        console.log("Server is listening to port...");
    });
})
.catch((err) => {
    console.error("Database cannot be connected." + err);
});