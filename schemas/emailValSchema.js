const Joi = require("joi");
const validateEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    validateEmailSchema,
};