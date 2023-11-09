const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Electrigo")
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
      process.exit(1); 
    });
};

module.exports = connectDB;
