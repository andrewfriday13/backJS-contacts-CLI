const yagrs = require('yargs')
const {hideBin}= require('yargs/helpers')
const { nanoid } = require('nanoid')
const contact = require('./contacts.js')

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'read':
            const allContacts = await contact.getAll()
            return console.table(allContacts)
        case 'getById':
            const contactById = await contact.getContactById(id)
            return console.log(contactById)
        case 'removeContact':
            const removeContact = await contact.deleteContact(id)
            return console.log(removeContact)
        case 'addContact':
            const addContact = await contact.addContact(id, name, email, phone)
            return console.log(addContact)
        default:
            return console.log('Unknow action')
    }
}
const arr = hideBin(process.argv)
const { argv } = yagrs(arr)
invokeAction(argv)