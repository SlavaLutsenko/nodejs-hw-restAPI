const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contacts");

const {
  validatePostCont,
  validateUpdCont,
  validateUpdFavField,
} = require("../../middleware/validation");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validatePostCont, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateUpdCont, updateContact);

router.patch("/:contactId/favorite", validateUpdFavField, updateStatusContact);

module.exports = router;
