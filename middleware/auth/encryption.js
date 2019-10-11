var bcrypt = require('bcryptjs');


const enctyptUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPass;
        return next();
    } catch(err) {
        return next(err);
    }
};

module.exports = enctyptUser;