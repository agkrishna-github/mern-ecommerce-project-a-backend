const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/ConnectDB");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const uploadRouter = require("./routes/uploadRoute");
const productRouter = require("./routes/productRoute");
const brandRouter = require("./routes/brandRoute");
const categoryRouter = require("./routes/categoryRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
// const orderRouter = require("./routes/orderRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/product", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogCategory", blogCategoryRouter);
// app.use("/api/orders", orderRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
