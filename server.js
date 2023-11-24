const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config()
const DB_HOST = process.env["DB_URI"];

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");
        app.listen(3000);
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
