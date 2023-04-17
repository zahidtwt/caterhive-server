const customers = require('../../models/customer/customer.model');
const jwt = require('jsonwebtoken');
const { uploadImageToCloudinary } = require('../../services/cloudinary');
const errorMessages = require('../../utils/errorMessages');
const { encryptPassword, verifyPassword } = require('../../utils/password');
const validator = require('../../utils/validator');
const { JWT_KEY, ENV } = require('../../config');
const customerValidatorSchema = require('./customer.validator');

const populateProp = [
  { path: 'orders' },
  {
    path: 'bookmarks',
    populate: [
      {
        path: 'caterers',
        model: 'Caterer',
      },
      {
        path: 'menus',
        model: 'Menu',
      },
    ],
  },
];

async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const { populate } = req.query;

    const customer = await customers
      .findById(id, { password: 0 })
      .populate(populate ? populateProp : '');

    if (!customer) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function getOwnData(req, res) {
  try {
    const { authUser } = req;

    const customer = await customers
      .findById(authUser, { password: 0 })
      .populate('area');
    // .populate(populateProp);

    if (!customer) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewCustomer(req, res) {
  try {
    const { body } = req;

    const { error } = validator(customerValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const { email, phone } = body;
    const exists =
      (await customers.findOne({ email })) ||
      (await customers.findOne({ phone }));

    if (exists) return res.status(400).json(errorMessages.exists);

    const encryptedPassword = await encryptPassword(body.password);

    const { secure_url } = await uploadImageToCloudinary(
      body.profileImg,
      500,
      500
    );

    const newCaterer = await customers.create({
      ...body,
      password: encryptedPassword,
      profileImg: secure_url,
    });

    return res.status(201).json(newCaterer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function loginCustomer(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json(errorMessages.invlidLogin);

    const customer = await customers.findOne({
      email,
    });

    if (!customer) return res.status(400).json(errorMessages.invlidLogin);

    const passwordMatch = await verifyPassword(password, customer.password);

    if (!passwordMatch) return res.status(400).json(errorMessages.invlidLogin);

    const token = jwt.sign({ id: customer._id }, JWT_KEY, {
      expiresIn: ENV === 'production' ? '1h' : '30d',
    });

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getCustomerById,
  getOwnData,
  createNewCustomer,
  loginCustomer,
};
