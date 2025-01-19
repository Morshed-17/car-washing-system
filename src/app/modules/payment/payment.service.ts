import { join } from 'path';
import AppError from '../../errors/AppError';
import { verifyPayment } from '../../utils/payment';
import { Booking } from '../booking/booking.model';
import { Slot } from '../slot/slot.model';
import { readFileSync } from 'fs';

const confirmationBooking = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (!verifyResponse) {
    throw new AppError(500, 'Payment verification failed');
  }

  let paymentStatus = 'Failed';
  let message = '';

  if (verifyResponse.pay_status === 'Successful') {
    paymentStatus = 'Paid';

    const booking = await Booking.findOneAndUpdate(
      { transactionId },
      { paymentStatus },
      { new: true },
    );

    if (booking) {
      await Slot.findByIdAndUpdate(booking.slot, { isBooked: 'booked' });
    }
  }

  if (verifyResponse.pay_status !== 'Successful') {
    await Booking.findOneAndUpdate({ transactionId }, { paymentStatus });
  }

  message = paymentStatus === 'Paid' ? 'Payment Successful.' : 'Payment Failed!';

  const filePath = join(__dirname, '../../views/confirmation.html');

  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationBooking,
};
