const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const userRouter = require("./router/user");
const codeRouter = require("./router/codePosts");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(3030, () => console.log("Server running on port 3030"));

app.use("/api", userRouter);
app.use("/api", codeRouter);
