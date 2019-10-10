const router = require('express').Router();
const User = require('../models/User');
const userValidation = require('../middleware/user-validation');

router.post('/register', userValidation, async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
