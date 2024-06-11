import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully!',
    data: result,
  });
});
const getSingleService = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await ServiceServices.getSingleService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully!',
    data: result,
  });
});
const getAllServices = catchAsync(async (req, res) => {

  const result = await ServiceServices.getAllService();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully!',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllServices
};
