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
const getSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotSlot.getSingleSlot(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot retrieved successfully!',
    data: result,
  });
});
const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotSlot.getAvailableSlots();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotSlot.updateSlot(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot updated successfully!',
    data: result,
  });
});
const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotSlot.deleteSlot(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot deleted successfully!',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getSingleSlot,
  getAvailableSlots,
  updateSlot,
  deleteSlot,
};
