const Enquiry = require("../models/enqModel");
const expressasynhandler = require("express-async-handler");
const { EmailSender } = require("./emailCtrl");

const createEnquiry = expressasynhandler(async (req, res) => {
  try {
    const { name, email, mobile, comment } = req.body;

    EmailSender({ name, email, mobile, comment });
    const createdEnquiry = await Enquiry.create(req.body);
    res.json(createdEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createEnquiry };
