require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');

const cors = require('cors');
const cookieparser = require('cookie-parser');

app.use(cors());
app.use(cookieparser());
app.use(express.json());

connectDB();

app.use('/register',require('./routes/api/register'));
app.use('/login',require('./routes/api/login'));

mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`);
        console.log('Database Connected');
    })
})