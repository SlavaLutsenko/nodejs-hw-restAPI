const fs = require("fs/promises");
const path = require("path");
const normalizedPath = path.resolve(__dirname, "./contacts.json");
const { ContactsModel } = require("../contacts.model");

// const getContactsFromDB = async () => {
//   const contacts = ContactsModel.find();
//   return contacts;
// };

const listContacts = async (req, res) => {
  try {
    const contacts = await ContactsModel.find();
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.contactId;
    const cont = await ContactsModel.findById(id);
    res.json(cont);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await ContactsModel.findByIdAndRemove(id);
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const newContact = await ContactsModel.create({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "missing required name field" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contacts = await ContactsModel.findByIdAndUpdate();
    const isContactExist = contacts.some((el) => el.id === id);
    const { name, email, phone } = req.body;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
    } else if (!isContactExist) res.status(404).json({ message: "Not found" });
    else {
      contacts.forEach((el) => {
        if (el.id === id) {
          el.name = name || el.name;
          el.email = email || el.email;
          el.phone = phone || el.phone;
        }
      });
      fs.writeFile(normalizedPath, JSON.stringify(contacts));
      const updCont = contacts.filter((el) => el.id === id);
      res.json(updCont);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
