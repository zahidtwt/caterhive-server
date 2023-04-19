const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'indiv643f21567c386';
const store_passwd = 'testindivfkl1';
const is_live = false;

async function makePayment(req, res) {
  try {
    const {} = req.query;

    const data = {
      total_amount: 100,
      currency: 'BDT',
      order_id: 'REF123', // use unique tran_id for each api call
      success_url: 'http://localhost:4000/paymnet/success',
      fail_url: 'http://localhost:4000/paymnet/fail',
      cancel_url: 'http://localhost:4000/paymnet/cancel',
      ipn_url: 'http://localhost:4000/paymnet/ipn',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.redirect(GatewayPageURL);
      console.log('Redirecting to: ', GatewayPageURL);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function handlePayment(req, res) {
  try {
    const { body } = req;

    console.log(body);

    res.status(200).json(body);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  makePayment,
  handlePayment,
};
