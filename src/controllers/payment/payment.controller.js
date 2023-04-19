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
      tran_id: 'REF123', // use unique tran_id for each api call
      success_url: 'https://caterhive-server.onrender.com/success',
      fail_url: 'https://caterhive-server.onrender.com/fail',
      cancel_url: 'https://caterhive-server.onrender.com/cancel',
      ipn_url: 'https://caterhive-server.onrender.com/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
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
