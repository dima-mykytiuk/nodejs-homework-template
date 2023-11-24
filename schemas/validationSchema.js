const Joi = require("joi");
const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string()
});

module.exports = {
    contactSchema,
};