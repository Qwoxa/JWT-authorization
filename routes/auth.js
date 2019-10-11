const router = require('express').Router();
const encryptUser = require('../middleware/auth/encryption');
const checkEmailUnique = require('../middleware/auth/email-unique');
const authController = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../middleware/auth/validation');


router.post('/register', checkEmailUnique, registerValidation, encryptUser, authController.register);

router.post('/login', loginValidation, authController.login);

module.exports = router;
