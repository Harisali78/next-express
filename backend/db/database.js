const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(
        `Database connected successfully with host ${mongoose.connection.host}`
      );
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
module.exports = connectDB;
