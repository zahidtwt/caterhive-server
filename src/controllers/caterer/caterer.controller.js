const caterers = require('../../models/caterer/caterer.model');
const { encryptPassword, verifyPassword } = require('../../utils/password');
const errorMessages = require('../../utils/errorMessages');
const validator = require('../../utils/validator');
const catererValidatorSchema = require('./caterer.validator');
const { uploadImageToCloudinary } = require('../../services/cloudinary');
const jwt = require('jsonwebtoken');
const { JWT_KEY, ENV } = require('../../config');

async function getAllCaterers(req, res) {
  try {
    const allCaterers = await caterers
      .find({}, { password: 0 })
      .populate('operationalAreas');
    // .populate('reviews');

    res.status(200).json(allCaterers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getCatererById(req, res) {
  try {
    const { id } = req.params;

    const caterer = await caterers
      .findById(id, { password: 0 })
      .populate('operationalAreas');
    // .populate('reviews');

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(caterer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getOwnData(req, res) {
  try {
    const { authUser } = req;

    const caterer = await caterers
      .findById(authUser, { password: 0 })
      .populate('operationalAreas');
    // .populate('reviews');

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(caterer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewCaterer(req, res) {
  try {
    const { body } = req;

    const { error } = validator(catererValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const { businessName, email, phone } = body;
    const exists =
      (await caterers.findOne({ businessName })) ||
      (await caterers.findOne({ email })) ||
      (await caterers.findOne({ phone }));

    if (exists) return res.status(400).json(errorMessages.exists);

    const encryptedPassword = await encryptPassword(body.password);

    const { secure_url } = await uploadImageToCloudinary(
      body.brandImg,
      500,
      500
    );

    const newCaterer = await caterers.create({
      ...body,
      password: encryptedPassword,
      brandImg: secure_url,
    });

    return res.status(201).json(newCaterer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function loginCaterer(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json(errorMessages.invlidLogin);

    const caterer = await caterers.findOne({
      email,
    });

    if (!caterer) return res.status(400).json(errorMessages.invlidLogin);

    const passwordMatch = await verifyPassword(password, caterer.password);

    if (!passwordMatch) return res.status(400).json(errorMessages.invlidLogin);

    const token = jwt.sign({ id: caterer._id }, JWT_KEY, {
      expiresIn: ENV === 'production' ? '1h' : '30d',
    });

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllCaterers,
  getOwnData,
  getCatererById,
  createNewCaterer,
  loginCaterer,
};
