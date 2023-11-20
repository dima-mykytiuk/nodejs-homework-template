const {v4: uuidv4} = require('uuid');
const Joi = require('joi');
const {Schema, model} = require('mongoose');

const contactSchemaMongo = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true});

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchemaMongo);

async function listContacts() {
    const data = await Contact.find();
    return data;
}

async function getContactById(contactId) {
    const result = await Contact.findById(contactId);
    if (!result) {
        return {
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`,
            },
        };
    }
    return {status: 200, message: {success: true, message: result}};
}

async function removeContact(contactId) {
    const result = await Contact.findOneAndDelete({ _id: contactId });
    if (!result) {
        return {
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`,
            },
        };
    }
    return {status: 200, message: {success: true, message: "contact deleted"}};
}

async function addContact(body) {
    if (Object.keys(body).length === 0) {
        return {
            status: 400,
            message: {
                success: false,
                message: "missing fields",
            },
        };
    }
    const {error, value} = contactSchema.validate(body, {
        abortEarly: false,
        presence: "required",
    });
    if (error) {
        return {
            status: 400,
            message: {
                success: false,
                message: error.details.map((detail) => detail.message),
            },
        };
    }

    const newContact = await Contact.create(body);
    return {status: 201, message: {success: true, message: newContact}};
}

async function updateContact(contactId, body) {
    if (Object.keys(body).length === 0) {
        return {
            status: 400,
            message: {
                success: false,
                message: "missing fields",
            },
        };
    }
    const {error, value} = contactSchema.validate(body, {abortEarly: false});
    if (error) {
        return {
            status: 400,
            message: {
                success: false,
                message: error.details.map((detail) => detail.message),
            },
        };
    }

    const result = await Contact.findByIdAndUpdate(contactId, body, {
        new: true,
    });
    if (!result) {
        return {
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`,
            },
        };
    }
    return {status: 200, message: {success: true, message: result}};
}

async function updateFavoriteStatus(contactId, body) {
    if (Object.keys(body).length === 0) {
        return {
            status: 400,
            message: {
                success: false,
                message: "missing field favorite",
            },
        };
    }
    if (typeof body.favorite !== 'boolean'){
        return {
            status: 400,
            message: {
                success: false,
                message: "field must be boolean",
            },
        };
    }
    const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    if (!result) {
        return {
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`,
            },
        };
    }
    return {status: 200, message: {success: true, message: result}};
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateFavoriteStatus
};
