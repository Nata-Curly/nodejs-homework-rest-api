const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');
const throwHttpError = HttpError(404, 'Not found');

const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw throwHttpError;
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw throwHttpError;
    }
    res.json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw throwHttpError;
    }
    res.json({ message: 'Deleted successfully' });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
}

