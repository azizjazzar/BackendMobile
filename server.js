require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const hostname = 'localhost';
const port = 9090;
const app = express(); 
const stripe = require("stripe")('sk_test_51OErmACis87pjNWpHjxy4jOfBeV5X2cD3bB2op5qNVdo8OY7pqpqJh235cFlSwbjNxfjsz6FMZAD1EVCWJs2kyDq00LYDaUrax');
connectDB();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to our server Electrigo !");
});

app.use("/api/auth", require("./routes/auth"));

app.use("/api/borne", require("./routes/borne"));
app.use("/api/review", require("./routes/review"));
app.use("/api/garage", require("./routes/garage"));
app.use("/api/posts", require("./routes/postRoutes")); 
app.use("/api/product", require("./routes/product"));
app.use("/api/favories", require("./routes/FavoritesRoutes"));
app.use('/api/carte',  require("./routes/CarteRoutes"));
app.use('/api/rating',  require("./routes/ratingRoutes"));
app.use("/api/categorie", require("./routes/categorie")); // Use consistent naming
app.use("/api/vehicule", require("./routes/vehicule"));
app.use("/api/reservation", require("./routes/reservation"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/mobile", require("./routes/Send"));
app.use("/api/posts", require("./routes/postRoutes"));


app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
})
