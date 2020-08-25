const express = require('express');
const app = express();
const User = require('./models/user.js');
const userRouter = require('./routes/userRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/users", userRouter);

app.listen(3000);

const user1 = new User('1', 'user1', '21');
const user2 = new User('2', 'user2', '22');
const user3 = new User('3', 'user3', '23');
user1.save();
user2.save();
user3.save();

console.log(User.getAllUsers());

app.get('/', function (req, res) {
    res.json({ app: true });
});
