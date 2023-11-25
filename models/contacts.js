const {v4: uuidv4} = require('uuid');
const Joi = require('joi');
const {Contact} = require("../schemas/mongoSchema");

async function listContacts(req, res, next) {
    const { _id: owner } = req.user;
    const data = await Contact.find({ owner });
    res.status(200).json(data);
}

async function addContact(req, res, next){
    const {_id: owner} = req.user
    const newContact = await Contact.create({...req.body, owner});
    res.status(201).json(newContact);
}

async function getContactById(req, res, next){
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    res.json(result);
}

async function removeContact(req, res, next) {
    const { contactId } = req.params;
    await Contact.findOneAndDelete({ _id: contactId });
    res.status(200).json({message:"contact deleted"});
}

async function updateContact(req, res, next) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    res.status(200).json({message:result});
}

async function updateFavoriteStatus(req, res, next) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    res.status(200).json({message:result});
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateFavoriteStatus
};
