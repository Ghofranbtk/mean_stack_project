const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path  =require("path");

const app = express();
mongoose.connect('mongodb://localhost:27017/Projet_PFE');
const dotenv = require('dotenv');
dotenv.config({ debug: process.env.DEBUG });
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const panierRoutes = require('./routes/panier');
const feedbackRoutes = require('./routes/feedback');
const whishlistRoutes = require('./routes/whishlist');
const avisproRoutes = require('./routes/avispro');
const forgotPasswordRoutes = require('./routes/forgotPassword');
const resetPasswordRoutes =  require('./routes/resetPasswordAPI');
const categoryRoutes = require('./routes/category');
const blogRoutes = require('./routes/blog');
const orderRoutes = require('./routes/order');


//Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Secutity configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept,Content-Type,X-Requested-with,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,PATCH,PUT"
    );
    next();
});



app.use("/api/user",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/panier",panierRoutes);
app.use("/api/feedback",feedbackRoutes);
app.use("/api/whish",whishlistRoutes);
app.use("/api/avis",avisproRoutes);
app.use("/api/forgotPassword",forgotPasswordRoutes);
app.use("/api/resetPassword",resetPasswordRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/order",orderRoutes);

module.exports = app;