const { format, transports, createLogger } = require('winston');

const logConfiguration = {
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.printf(({ timestamp, level, message }) => `${timestamp} - ${level}: ${message}`)
            )
        }),
        new transports.File({
            filename: './logs/app.log',
            format: format.combine(
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => `${timestamp} - ${level}: ${message}`)
            )
        })
    ]
};

const logger = createLogger(logConfiguration);

export default logger;
