const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const {schemas} = require('../../models/contact');
const { validateBody, isValidId } = require('../../middlewares');

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;


