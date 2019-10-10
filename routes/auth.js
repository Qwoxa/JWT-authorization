const router = require('express').Router();

router.post('/register', (req, res) => {
    res.status(201).send('Registered');
})

module.exports = router;
