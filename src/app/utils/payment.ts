import config from '../config';
import axios from 'axios';
import { TPaymentData } from '../modules/booking/booking.interface';
import AppError from '../errors/AppError';

export const initiatePayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signeture_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: 'http://localhost:5173',
      amount: paymentData.totalPrice,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerEmail,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });

    return response.data;
  } catch (error) {
    throw new AppError(500, 'Payment initiation failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signeture_key,
        type: 'json',
        request_id: tnxId,
      },
    });
    return response.data;
  } catch (err) {
    throw new AppError(500, 'Payment validation failed!');
  }
};
