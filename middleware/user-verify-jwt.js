const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return  // TODO 401
    // TODO bearer

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        return next(new Error('Invalid token')); // TODO 400
    }
};

module.exports = verify;