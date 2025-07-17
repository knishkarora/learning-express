const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/namish")
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

module.exports = connection;
