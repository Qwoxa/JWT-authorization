var bcrypt = require('bcryptjs');


const enctyptUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.password, salt);
        req.password = hashPass;
        next()
    } catch(err) {
        next(err);
    }
};

module.exports = enctyptUser;