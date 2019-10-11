const User = require('../models/User');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const createError = require('http-errors');

module.exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    try {
        const user = new User({ name, email, password });
        const { _id } = await user.save();
        res.status(201).json({ _id });
    } catch (e) {
        next(e);
    }
};


module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(createError(401, 'Email or password is wrong!'));

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return next(createError(401, 'Email or password is wrong!'));

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '7h' });
    res.header('Authorization', token).json({ token });
}