const User = require('../models/User');


const emailIsUnique = async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailExists = await User.findOne({ email });
        if (emailExists) return next(new Error('Email already exists'));
        next();
    } catch(err) {
        next(err);
    }
};

module.exports = emailIsUnique;
