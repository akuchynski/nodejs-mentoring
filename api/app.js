import express from 'express';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import { sequelize } from './db';
import logger from './utils/loggers/logger';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { verifyAccessToken } from './middlewares/accessTokenHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.use(verifyAccessToken);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use(globalErrorHandler);

process
    .on('unhandledRejection', (reason, p) => {
        logger.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        logger.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.EXPRESS_PORT, () => {
            logger.info(`Server is running on port: ${process.env.EXPRESS_PORT}`);
        });
    });
