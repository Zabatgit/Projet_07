const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site"); // it allows images to be loaded
  next();
});

const dotenv = require("dotenv"); 
dotenv.config(); 

mongoose 
  .connect(
    "mongodb+srv://lau-74:yOl63XMVEKmcfZvZ@cluster0.g7fpd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !")) 
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const articlesRoutes = require("./routes/article");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const path = require("path");

app.use((req, res, next) => { // This is the middleware that allows us to access the API from any origin
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader( 
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader( 
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json()); 

app.use("/api/articles", articlesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images"))); // This is the middleware that allows us to access the images folder

module.exports = app;
