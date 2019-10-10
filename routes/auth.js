const router = require('express').Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const { registerValidation } = require('../middleware/user-validation');

router.post('/register', registerValidation, async (req, res, next) => {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) return next(new Error('Email already exists'));
    
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    
    try {
        const user = new User({ name, email, password: hashPass });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
