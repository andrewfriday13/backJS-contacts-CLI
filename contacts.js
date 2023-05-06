

const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json')


const getAll = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

const getContactById = async (id) => {
    const contactId = String(id)
    const contacts = await getAll()
    return contacts.find(contact => contact.id === contactId) || null

}


const deleteContact = async (id) => {
    const contactId = String(id)
     const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (id, name, email, phone) => {
    const contactId = String(id)
    const contacts = await getAll()
   const newContact = { id: contactId, name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = { 
    getAll,
    getContactById,
    deleteContact,
    addContact,
}


