import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { BookingServices } from './booking.service';


const createBooking = catchAsync(async (req, res) => {
  const user = req.user
  const result = await BookingServices.createBooking(req.body, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successfull',
    data: result,
  });
});
// const getSingleService = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await BookingServices.getSingleService(id);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service retrieved successfully!',
//     data: result,
//   });
// });
// const getAllServices = catchAsync(async (req, res) => {
//   const result = await BookingServices.getAllService();
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Services retrieved successfully!',
//     data: result,
//   });
// });



export const BookingControllers = {
    createBooking,
//   getSingleService,
//   getAllServices,

};
