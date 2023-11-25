const {User} = require("../schemas/mongoSchema");
const validateEmail = (schema) => {
    return async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({message: "missing field email"});
        }
        const {error, value} = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details.map((detail) => detail.message),
            });
        }
        const user = await User.findOne(
            {email: req.body.email}
        );
        if (!user) {
            return res.status(400).send({
                message: "No user with provided email"
            });
        }
        if (user.verify) {
            return res.status(400).send({message: "Verification has already been passed"})
        }
        next();
    };
}

module.exports = validateEmail;