const router = require('express').Router();
const User = require('../models/User');
const encryptUser = require('../middleware/user-encryption');
const checkEmailUnique = require('../middleware/user-email-unique');
const { registerValidation } = require('../middleware/user-validation');


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

module.exports = router;
