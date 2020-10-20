const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = (userId) => {
    const payload = { 'sub': userId };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_TIME });
};

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw createError.Forbidden('Failed to authenticate access token!');
            }
            req.decoded = decoded;
            next();
        });
    } else {
        throw createError.Unauthorized('Access token is absent!');
    }
};

const signRefreshToken = (userId) => {
    const payload = { 'sub': userId };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_TIME });
};

const verifyRefreshToken = (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw createError.Forbidden('Failed to authenticate refresh token!');
        }
        return decoded.sub;
    });
};

export { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };
