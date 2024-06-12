import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.createBooking(req.body, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successfull',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {

  const user = req.user
  const result = await BookingServices.getSingleBooking(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getSingleBooking,
  getAllBookings,
};
