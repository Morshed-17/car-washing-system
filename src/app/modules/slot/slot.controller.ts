import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { SlotSlot } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotSlot.createSlot(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully!',
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotSlot.getAvailableSlots(req.query);
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Available slots retrieved successfully'
      : 'No Data Found',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};
