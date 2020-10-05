import logger from '../loggers/logger';

export const logged = (target, methodName, descriptor) => {
    const value = descriptor.value;
    descriptor.value = async (...args) => {
        const startTime = Date.now();
        try {
            logger.info(`Service method and arguments: ${target.constructor.name}::${methodName}(${[args]})`);
            return await value.apply(this, args);
        } catch (err) {
            throw err;
        } finally {
            logger.warn(`Execution time for method ${methodName}: ${Date.now() - startTime} ms`);
        }
    };
    return descriptor;
};
