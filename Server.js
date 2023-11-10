require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const hostname = '127.0.0.1';
const port = 9090;
const app = express(); 
connectDB();
app.use(express.json());

app.use("/api/vehicule", require("./routes/vehicule"));


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
