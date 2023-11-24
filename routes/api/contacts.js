const express = require('express')
const contacts = require('../../models/contacts');
const isValidFavorite = require("../../middlewares/checkFavorite");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/isValidBody");
const {contactSchema} = require("../../schemas/validationSchema");
const router = express.Router()

router.get('/', contacts.listContacts)
router.get('/:contactId', isValidId, contacts.getContactById)
router.post('/', validateBody(contactSchema, "post"), contacts.addContact)
router.delete('/:contactId', isValidId, contacts.removeContact)
router.put('/:contactId', isValidId, validateBody(contactSchema, "put"), contacts.updateContact)
router.patch('/:contactId/favorite', isValidId, isValidFavorite, contacts.updateFavoriteStatus)

module.exports = router
