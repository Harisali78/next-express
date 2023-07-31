const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is a required field"],
        minLength: [3, "Name Should be at least of 3 characters"],
        maxLength: [30, "Name Should not exceed 30 characters"],
    },
    last_name: {
        type: String,
        required: [true, "Last name is a required field"],
        minLength: [3, "Name Should be at least of 3 characters"],
        maxLength: [30, "Name Should not exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
    },
});

const authModel = mongoose.model("user", authSchema);

module.exports = authModel;
