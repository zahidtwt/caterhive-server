const { CLIENT_URL } = require('../../config');
const { getPaymentData, sslcz } = require('../../utils/payment');

async function makePayment(req, res) {
  try {
    const {
      amount,
      customerName,
      customerEamil,
      customerPhone,
      shippingAddress,
      tran_id = 'transactionId',
    } = req.query;

    const data = getPaymentData(
      req,
      amount,
      customerName,
      customerEamil,
      customerPhone,
      shippingAddress,
      tran_id
    );

    const response = await sslcz.init(data);

    if (!response.GatewayPageURL)
      return res.status(402).json('Payment Required');

    res.status(300).redirect(response.GatewayPageURL);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function handleSuccesfulPayment(req, res) {
  try {
    res.status(300).redirect(`${CLIENT_URL}/orders/paymentSuccessful`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function handleFailedPayment(req, res) {
  try {
    res.status(300).redirect(`${CLIENT_URL}/orders/paymentFailed`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  makePayment,
  handleSuccesfulPayment,
  handleFailedPayment,
};
