// Proje 5 katmandan oluşacak
const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers')
const customErrorHandler = require('./middlewares/errors/customErrorHandler')
const connectDatabase = require('./helpers/database/connectDatabase')

// Environment Variables
dotenv.config({
    path: "./config/env/config.env"
});
//MongoDb Connection
connectDatabase();

const app = express();
const PORT = process.env.PORT; // in case deployment

//Routers Middleware
app.use("/api", routers);

//Error Handler
app.use(customErrorHandler)


app.listen(PORT, () => {
    console.log(`App started on ${PORT}: ${process.env.NODE_ENV}`);
});