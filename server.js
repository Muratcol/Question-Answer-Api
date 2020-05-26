
const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const connectDatabase = require('./helpers/database/connectDatabase');
const path = require('path');
const favicon = require('serve-favicon');

// Environment Variables
dotenv.config({
    path: "./config/env/config.env"
});
//MongoDb Connection
connectDatabase();

const app = express();
// Express - Body Middleware
app.use(express.json());


const PORT = process.env.PORT; // in case deployment

//Routers Middleware
app.use("/", routers);

//Error Handler
app.use(customErrorHandler)

//Static Files
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.listen(PORT, () => {
    console.log(`App started on ${PORT}: ${process.env.NODE_ENV}`);
});


