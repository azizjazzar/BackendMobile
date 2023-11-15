require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const hostname = '127.0.0.1';
const port = 9090;
const app = express(); 
connectDB();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/borne", require("./routes/borne"));
app.use("/api/review", require("./routes/review"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
