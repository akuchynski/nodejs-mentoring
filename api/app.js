const express = require('express');
const app = express();
const User = require('./models/user.js');
const userRouter = require('./routes/userRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

app.use('/users', userRouter);

console.log(User.getAllUsers());

app.get('/', (req, res) => {
    res.json({ app: true });
});
