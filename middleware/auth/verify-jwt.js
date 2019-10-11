const jwt = require('jsonwebtoken');
const createError = require('http-errors')

const verify = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return next(createError(401, 'Access denied'));
    // TODO bearer

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        return next(createError(400, 'Invalid token'));
    }
};

module.exports = verify;