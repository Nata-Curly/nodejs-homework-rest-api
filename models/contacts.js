const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const read = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
};

const write = async (data) => {
    const result = fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
};

const listContacts = async () => {
    const contacts = await read();
    return contacts;
};

const getContactById = async (contactId) => {
    const contacts = await read();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
};

const addContact = async (contact) => {
    const contacts = await read();
    const newContact = { id: crypto.randomUUID(), ...contact, };
    contacts.push(newContact);
    await write(contacts);
    return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await read();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  };
  contacts[index] = { contactId, ...body };
  await write(contacts);
  return contacts[index];
};

const removeContact = async (contactId) => {
    const contacts = await read();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    };
    const [newContacts] = contacts.splice(index, 1);
    await write(contacts);
    return newContacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}

