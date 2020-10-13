import { userService } from '../services/userService';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../middlewares/accessTokenHandler';

const login = async (req, res, next) => {
    try {
        const user = await userService.getUserByLoginPassword(req.body.login, req.body.password);
        if (user) {
            const accessToken = signAccessToken(user.id);
            const refreshToken = signRefreshToken(user.id);
            res.send({ accessToken, refreshToken });
        } else {
            throw ({ status: 403, code: 'USER_NOT_AUTHENTICATED', message: 'Username or password is incorrect' });
        }
    } catch (error) {
        return next(error);
    }
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const userId = verifyRefreshToken(req.body.refreshToken);
        const accessToken = signAccessToken(userId);
        const refreshToken = signRefreshToken(userId);
        res.send({ accessToken, refreshToken });
    } catch (error) {
        return next(error);
    }
};

export {
    login,
    refreshAccessToken
};
