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
    const result = Service.find();
  return result;
};

export const ServiceServices = {
  createService,
  getSingleService,
  getAllService,
};
