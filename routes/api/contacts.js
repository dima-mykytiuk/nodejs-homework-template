const express = require('express')
const contacts = require('../../models/contacts');
const isValidFavorite = require("../../middlewares/checkFavorite");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/isValidBody");
const {contactSchema} = require("../../schemas/validationSchema");
const authenticate = require("../../middlewares/checkAuth");
const router = express.Router()

router.get('/', authenticate, contacts.listContacts)
router.get('/:contactId', authenticate, isValidId, contacts.getContactById)
router.post('/', authenticate, validateBody(contactSchema), contacts.addContact)
router.delete('/:contactId',authenticate, isValidId, contacts.removeContact)
router.put('/:contactId',authenticate, isValidId, validateBody(contactSchema), contacts.updateContact)
router.patch('/:contactId/favorite',authenticate, isValidId, isValidFavorite, contacts.updateFavoriteStatus)

module.exports = router
