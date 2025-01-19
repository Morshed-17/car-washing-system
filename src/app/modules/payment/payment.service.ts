import { join } from 'path';
import AppError from '../../errors/AppError';
import { verifyPayment } from '../../utils/payment';
import { Booking } from '../booking/booking.model';
import { Slot } from '../slot/slot.model';
import { readFileSync } from 'fs';

const confirmationBooking = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = '';


  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Paid',
      },
    );
    message = 'Successfully Paid!';
  } else {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Failed',
      },
    );
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../views/confirmation.html');

  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', message);

  if (!result) return template;

  await Slot.findByIdAndUpdate(
    result.slot,
    {
      isBooked: 'booked',
    },
    { new: true },
  );

  return `<h1>Payment ${status}</h1>`;
};

export const paymentServices = {
  confirmationBooking,
};
