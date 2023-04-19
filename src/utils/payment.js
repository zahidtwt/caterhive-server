const { SSL_STORE_ID, SSL_STORE_PASSWORD } = require('../config');

const SSLCommerzPayment = require('sslcommerz-lts');

const store_id = SSL_STORE_ID;
const store_passwd = SSL_STORE_PASSWORD;
const is_live = false;

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

function getPaymentData(
  req,
  amount,
  customerName,
  customerEamil,
  customerPhone,
  shippingAddress,
  tran_id = 'transactionId'
) {
  return {
    total_amount: Number(amount),
    currency: 'BDT',
    tran_id,
    success_url: `${req.protocol + '://' + req.get('host')}/payment/success`,
    fail_url: `${req.protocol + '://' + req.get('host')}/payment/fail`,
    cancel_url: `${req.protocol + '://' + req.get('host')}/cancel`,
    ipn_url: `${req.protocol + '://' + req.get('host')}/ipn`,
    shipping_method: 'Courier',
    product_name: 'food',
    product_category: 'food',
    product_profile: 'general',
    cus_name: customerName,
    cus_email: customerEamil,
    cus_add1: shippingAddress,
    cus_phone: customerPhone,
    ship_name: customerName,
    ship_add1: shippingAddress,
    ship_city: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
}

module.exports = { sslcz, getPaymentData };
