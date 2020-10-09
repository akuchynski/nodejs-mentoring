const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({ success: false, message: 'Failed to authenticate token!' });
            }
            console.log(decoded);
            next();
        });
    } else {
        res.status(401).send({ success: false, message: 'Access token is absent!' });
    }
};

export { authenticateToken };
