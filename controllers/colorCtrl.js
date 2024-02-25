const expressAsyncHandler = require("express-async-handler");
const Color = require("../models/colorModel");

const createColor = expressAsyncHandler(async (req, res) => {
  try {
    const createdColor = await Color.create({ title: req.body.id });
    res.json(createdColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getColors = expressAsyncHandler(async (req, res) => {
  try {
    const allColors = await Color.find();
    res.json(allColors);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedColor = await Color.findByIdAndDelete({ _id: id });
    res.json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createColor, getColors, deleteColor };
