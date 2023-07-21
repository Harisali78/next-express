require("dotenv").config();
const express = require("express");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const connectDB = require("./db/database");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/v1", productRouter);
app.use("/api/v1", authRouter);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
