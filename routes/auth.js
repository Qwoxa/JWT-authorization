const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const encryptUser = require('../middleware/user-encryption');
const checkEmailUnique = require('../middleware/user-email-unique');
const { registerValidation, loginValidation } = require('../middleware/user-validation');


router.post('/register', checkEmailUnique, registerValidation, encryptUser, async (req, res, next) => {
    const { name, email, password } = req.body;
    
    try {
        const user = new User({ name, email, password });
        const { _id } = await user.save();
        res.status(201).json({ _id });
    } catch (e) {
        next(e);
    }
});

router.post('/login', loginValidation, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new Error('Email or password is wrong! (status)')); // TODO statuses

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return next(new Error('Email or password is wrong! (status)')); // TODO statuses

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '7h' });
    res.header('Authorization', token).send(token);
});

module.exports = router;
