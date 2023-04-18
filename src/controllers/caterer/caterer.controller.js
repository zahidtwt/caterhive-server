const caterers = require('../../models/caterer/caterer.model');
const { encryptPassword, verifyPassword } = require('../../utils/password');
const errorMessages = require('../../utils/errorMessages');
const validator = require('../../utils/validator');
const {
  catererValidatorSchema,
  dayMenuValidatorSchema,
} = require('./caterer.validator');
const { uploadImageToCloudinary } = require('../../services/cloudinary');
const jwt = require('jsonwebtoken');
const { JWT_KEY, ENV } = require('../../config');

const weekMenuPopulation = {
  path: 'weekMenu',
  populate: [
    { path: 'saturday', populate: 'menus caterer' },
    { path: 'sunday', populate: 'menus caterer' },
    { path: 'monday', populate: 'menus caterer' },
    { path: 'tuesday', populate: 'menus caterer' },
    { path: 'wednesday', populate: 'menus caterer' },
    { path: 'thursday', populate: 'menus caterer' },
    { path: 'friday', populate: 'menus caterer' },
  ],
};

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
      .populate('operationalAreas')
      .populate(weekMenuPopulation)
      .populate('reviews');

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
      .populate('operationalAreas')
      .populate(weekMenuPopulation);
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

async function reviewCatererById(req, res) {
  try {
    const { authUser, params, body } = req;
    const { id } = params;

    const { error } = validator(reviewValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const caterer = await caterers.findById(id);

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    const customer = await customers.findById(authUser);

    if (!customer) return res.status(404).json(errorMessages.accessDenied);

    const newReview = await reviews.create({
      user: authUser,
      createdAt: new Date().toISOString(),
      ...body,
    });

    caterer.reviews.push(newReview._id);
    await caterer.populate('reviews');

    caterer.rating = (
      caterer.reviews.reduce((acc, curr) => curr.rating + acc, 0) /
      +caterer.reviews.length
    ).toFixed(2);

    await caterer.save();

    await caterer.populate([
      { path: 'operationalAreas' },
      { path: 'reviews', populate: { path: 'user' } },
    ]);
    return res.status(200).json(caterer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function addCatererToBookmark(req, res) {
  try {
    const { authUser, params } = req;
    const { id } = params;

    const caterer = await caterers.findById(id);

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    const customer = await customers.findById(authUser);

    if (!customer) return res.status(404).json(errorMessages.accessDenied);

    const customerCaterers = customer.bookmarks.caterers;
    if (customerCaterers.includes(id))
      customer.bookmarks.caterers = customerCaterers.filter(
        (caterer) => caterer._id + '' !== id
      );
    else customer.bookmarks.caterers.push(id);

    await customer.save();

    await customer.populate('area');

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function addDayMenu(req, res) {
  try {
    const { authUser, body } = req;

    const caterer = await caterers.findById(authUser);

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    const { error } = validator(dayMenuValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    caterer.weekMenu[body.day.toLowerCase()] = body.dayMenu;

    await caterer.save();

    await caterer.populate(weekMenuPopulation);

    return res.status(200).json(caterer.weekMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllCaterers,
  getOwnData,
  getCatererById,
  createNewCaterer,
  loginCaterer,
  reviewCatererById,
  addCatererToBookmark,
  addDayMenu,
};
