import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlot = async (payload: TSlot) => {
  const service = await Service.findById(payload?.service);
  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service does not exists by this id',
    );
  }
  const serviceDuration = service?.duration;
  const startTimeString = payload?.startTime;
  const endTimeString = payload?.endTime;

  const startTimeInMins =
    Number(startTimeString.split(':')[0]) * serviceDuration;
  const endTimeInMins = Number(endTimeString.split(':')[0]) * serviceDuration;

  const totalDuration = endTimeInMins - startTimeInMins;

  const numberOfSlots = totalDuration / serviceDuration;

  // generate slots

  const timeIntervals: { startTime: string; endTime: string }[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const startTime =
      (Number(startTimeString.split(':')[0]) + i).toString() + ':00';
    const endTime =
      (
        Number(endTimeString.split(':')[0]) -
        (numberOfSlots - 1) +
        i
      ).toString() + ':00';

    timeIntervals.push({ startTime, endTime });
  }

  const slots = timeIntervals.map((time) => {
    return {
      service: payload?.service,
      date: payload?.date,
      startTime: time.startTime,
      endTime: time.endTime,
    };
  });

  const result = await Slot.create(slots);
  return result;
};

const getSingleSlot = async (id: string) => {
  const result = Slot.findById(id);
  return result;
};

const getAllSlot = async () => {
  const result = Slot.find();
  return result;
};

const updateSlot = async (id: string, payload: Partial<TSlot>) => {
  const result = Slot.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSlot = async (id: string) => {
  const result = Slot.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const SlotSlot = {
  createSlot,
  getSingleSlot,
  getAllSlot,
  updateSlot,
  deleteSlot,
};
