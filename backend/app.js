
const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv")
const fs = require('fs');
app.use(bodyParser.urlencoded({extended:true,limit: '500mb', parameterLimit: 50000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true, limit: '500mb'}));


if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })}

// Route imports
const product = require("./routes/ProductRoute");


const blog = require("./routes/BlogRoute");

const qrcode = require("./routes/QrcodeRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/WishListRoute");
const axios = require('axios');
const querystring = require('querystring');

app.use("/api/v2",product);

app.use("/api/v2",blog);

app.use("/api/v2",qrcode);

app.use("/api/v2",user);

app.use("/api/v2",order);

app.use("/api/v2",payment);

app.use("/api/v2",cart);
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(express.static(path.join(__dirname,"../frontend/build")));

app.use(ErrorHandler);

module.exports = app