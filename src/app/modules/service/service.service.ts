import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: TService) => {
  const result = Service.create(payload);
  return result;
};

const getSingleService = async (id: string) => {
  const result = Service.findById(id);
  return result;
};

const getAllService = async () => {
  const result = await Service.find();
  return result;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found by this id');
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteService = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createService,
  getSingleService,
  getAllService,
  updateService,
  deleteService,
};
