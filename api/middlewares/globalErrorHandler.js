import logger from '../utils/loggers/logger';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    if (err.status) {
        logger.error(`Error code: ${err.code} Message: ${err.message}`);
        res.status(err.status).json({ error: { message: err.message } });
    } else {
        logger.error(`Unhandled error (${err.name}): ${err.message}`);
        res.status(500).json({ error: { message: err.message } });
    }
};

export default globalErrorHandler;
