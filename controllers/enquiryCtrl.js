const Enquiry = require("../models/enqModel");
const expressasynhandler = require("express-async-handler");

const createEnquiry = expressasynhandler(async (req, res) => {
  console.log(req.body);
  try {
    const createdEnquiry = await Enquiry.create(req.body);
    res.json(createdEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createEnquiry };
