const expressAsyncHandler = require("express-async-handler");
const HomePageModel = require("../models/homePageModel");
const HomePageSubModel = require("../models/homePageSubModel");

const createHomedetails = expressAsyncHandler(async (req, res) => {
  try {
    const newData = await HomePageModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
    });

    res.json({
      success: true,
      newData,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getHomedetails = expressAsyncHandler(async (req, res) => {
  try {
    const homeDetails = await HomePageModel.find();

    res.json({
      success: true,
      homeDetails,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createHomeSubdetails = expressAsyncHandler(async (req, res) => {
  try {
    const homeSubDetails = await HomePageSubModel.create(req.body);

    res.json({
      success: true,
      homeSubDetails,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getHomepageSubDetails = expressAsyncHandler(async (req, res) => {
  try {
    const homeSubDetails = await HomePageSubModel.find();

    res.json({
      success: true,
      homeSubDetails,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createHomedetails,
  getHomedetails,
  createHomeSubdetails,
  getHomepageSubDetails,
};
