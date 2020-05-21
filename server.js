// Proje 5 katmandan oluşacak
const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const connectDatabase = require('./helpers/database/connectDatabase');
const path = require('path');

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
app.use("/api", routers);

//Error Handler
app.use(customErrorHandler)

//Static Files
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`App started on ${PORT}: ${process.env.NODE_ENV}`);
});