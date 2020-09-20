import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import { sequelize } from './db';
import User from './db/models/user.model';
import Group from './db/models/group.model';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(process.env.EXPRESS_PORT);

User.belongsToMany(Group, { through: 'user_group' });
Group.belongsToMany(User, { through: 'user_group' });

sequelize
    .authenticate()
    .then(async () => {
        await User.sync();
        await Group.sync();
    })
    .catch(err => {
        console.error(err);
    });
