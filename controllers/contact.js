const Contact = require("../models/Contact");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const saveContactForm = asyncErrorWrapper(async (req, res, next) => {
  const contactForm = req.body;

  const contact = await Contact.create({
    ...contactForm, //... is spread operator. Exact as "title: information.title"
  });

  res.status(200).json({
    success: true,
    data: contact,
  });
});

module.exports = { saveContactForm };
