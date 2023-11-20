const express = require('express')
const contacts = require('../../models/contacts');
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        return res.json(result)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

router.get('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        return res.status(result.status).json(result.message)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

router.post('/', async (req, res, next) => {
    try {
        const result = await contacts.addContact(req.body);
        return res.status(result.status).json(result.message)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        return res.status(result.status).json(result.message)
    } catch (error){
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

router.put('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        return res.status(result.status).json(result.message)
    } catch (error){
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.updateFavoriteStatus(contactId, req.body);
        return res.status(result.status).json(result.message)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

module.exports = router
