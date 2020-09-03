const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(process.env.EXPRESS_PORT);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
