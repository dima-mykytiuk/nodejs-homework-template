const fs = require("fs/promises");
const path = require("path");
const {v4: uuidv4} = require('uuid');
const Joi = require('joi');

const contactsPath = path.join(__dirname, "./contacts.json");
const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
});
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId) || null;
    if (!result) {
        return ({
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`
            }
        });
    }
    return {status: 200, message: {success: true, message: result}};
}


async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index === -1) {
        return ({
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`,
            }
        });
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return {status: 200, message: {success: true, message: result}};
}

async function addContact(body) {
    if (Object.keys(body).length === 0) {
        return {
            status: 400,
            message: {
                success: false,
                message: "missing fields"
            }
        }
    }
    const {error, value} = contactSchema.validate(body, {abortEarly: false, presence: "required"});
    if (error) {
        return {
            status: 400,
            message:
                {
                    success: false,
                    message: error.details.map(detail => detail.message)
                }
        };
    }
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        ...body
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return {status: 200, message: {success: true, message: newContact}};
}

const updateContact = async (contactId, body) => {
    if (Object.keys(body).length === 0) {
        return {
            status: 400,
            message: {
                success: false,
                message: "missing fields"
            }
        }
    }
    const {error, value} = contactSchema.validate(body, {abortEarly: false});
    if (error) {
        return {
            status: 400,
            message:
                {
                    success: false,
                    message: error.details.map(detail => detail.message)
                }
        };
    }
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return ({
            status: 404,
            message: {
                success: false,
                message: `Contact with id ${contactId} not found`
            }
        });
    }
    Object.keys(body).forEach(key => {
        if (contacts[index].hasOwnProperty(key)) {
            contacts[index][key] = body[key];
        }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return {status: 200, message: {success: true, message: contacts[index]}};
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}
