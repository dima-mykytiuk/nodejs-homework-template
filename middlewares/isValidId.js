const {isValidObjectId} = require('mongoose');
const {Contact} = require("../schemas/mongoSchema");
const isValidId = async (req, res, next) => {
    const {contactId} = req.params;
    if (!isValidObjectId(contactId)) {
        return res.status(400).send({message: `${contactId} is not valid id`});
    }
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).send({ message: `Contact with id ${contactId} not found` });
    }
    next();
}

module.exports = isValidId;