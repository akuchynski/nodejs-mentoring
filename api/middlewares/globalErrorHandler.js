import logger from '../utils/loggers/logger';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    logger.error(`Error status: ${err.status || 500} Message: ${err.message || 'Internal Server Error'}`);
    res.status(err.status || 500)
        .send({
            error: {
                status: err.status || 500,
                message: err.message || 'Internal Server Error'
            }
        });
};

export default globalErrorHandler;
