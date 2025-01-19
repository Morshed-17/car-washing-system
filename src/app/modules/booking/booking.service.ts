
import { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import { initiatePayment } from '../../utils/payment';
import { Slot } from '../slot/slot.model';
import { Service } from '../service/service.model';
import AppError from '../../errors/AppError';
import { TPaymentData } from './booking.interface';

const createBooking = async (payload: { slot: string }, user: JwtPayload) => {
  const userData = await User.findOne({ email: user?.email, role: user?.role });
  if (!userData) {
    throw new AppError(404, 'User Not found');
  }

  const slotData = await Slot.findById(payload.slot);

  if (!slotData) {
    throw new AppError(404, 'Slot Not found');
  }

  const serviceData = await Service.findById(slotData?.service);

  if (!serviceData) {
    throw new AppError(404, 'Service Not found');
  }

  const transactionId = uuidv4();

  const paymentData: TPaymentData = {
    transactionId,
    totalPrice: serviceData.price,
    customerName: userData.name,
    customerAddress: userData.address,
    customerEmail: userData.email,
    customerPhone: userData?.phone,
  };

  const paymentSession = await initiatePayment(paymentData);

  console.log(paymentSession)


  const booking = await Booking.create({
    user: userData._id,
    slot: payload.slot,
    totalPrice: paymentData.totalPrice,
    transactionId,
  });
  
  if (!booking) {
    throw new AppError(500, 'Something went wrong while booking');
  }

  return paymentSession;
};

const getAllBookings = async () => {
  const result = await Booking.find().populate('slot');
  return result;
};

const getUserBooking = async (user: JwtPayload) => {
  const userData = await User.findOne({ email: user?.email, role: user?.role });

  const result = Booking.find({ customer: userData?._id });
  return result;
};

export const BookingServices = {
  createBooking,
  getUserBooking,
  getAllBookings,
};
