import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import { sequelize } from './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/groups', groupRouter);

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.EXPRESS_PORT, () => {
            console.log(`Server is running on port: ${process.env.EXPRESS_PORT}`);
        });
    });
