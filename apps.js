const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log("DB Connected")
});

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//bring  in routes
const PostRoutes = require('./posts/routes/post');
const userRoutes = require('./authentication/routes/user');

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/', PostRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!'});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`node api is listened on port: ${port}`)
});