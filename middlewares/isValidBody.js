const validateBody = (schema) => {
    return (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({message: "missing fields"});
        }

        let validationOptions = {};
        if (req.method === "POST") {
            validationOptions = {
                abortEarly: false,
                presence: "required",
            };
        }

        const {error, value} = schema.validate(req.body, validationOptions);
        if (error) {
            return res.status(400).send({
                message: error.details.map((detail) => detail.message),
            });
        }
        next();
    };
};

module.exports = validateBody;