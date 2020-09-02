const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');

const sequelize = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

app.use('/users', userRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
