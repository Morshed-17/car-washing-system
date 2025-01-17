import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleService(id);
  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? 'Service retrieved successfully' : 'No Data Found',
    data: result,
  });
});
const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllService(req.query);
  sendResponse(res, {
    success: result.services.length ? true : false,
    statusCode: result.services.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.services.length
      ? 'Services retrieved successfully'
      : 'No Data Found',
    data: {
      data: result?.services,
      meta: result?.meta
    },
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.updateService(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully!',
    data: result,
  });
});
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully!',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
