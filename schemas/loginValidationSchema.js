const {User} = require("../schemas/mongoSchema");
const validateLogin = (schema) => {
    return async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({message: "missing fields"});
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(409).send({message: "No user with provided email"})
        }
        const {error, value} = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details.map((detail) => detail.message),
            });
        }
        next();
    };
};

module.exports = validateLogin;