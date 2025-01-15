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
      'Service does not exist by this id',
    );
  }
  const serviceDuration = service?.duration; // e.g., 90 mins
  const startTimeString = payload?.startTime; // e.g., "09:00"
  const endTimeString = payload?.endTime; // e.g., "14:00"

  // Convert start and end times to total minutes
  const startTimeInMins =
    Number(startTimeString.split(':')[0]) * 60 +
    Number(startTimeString.split(':')[1]);
  const endTimeInMins =
    Number(endTimeString.split(':')[0]) * 60 +
    Number(endTimeString.split(':')[1]);

  // Generate slots dynamically
  const timeIntervals: { startTime: string; endTime: string }[] = [];
  let currentStartTime = startTimeInMins;

  while (currentStartTime + serviceDuration <= endTimeInMins) {
    const currentEndTime = currentStartTime + serviceDuration;

    // Convert minutes back to "HH:mm" format
    const startTime =
      String(Math.floor(currentStartTime / 60)).padStart(2, '0') +
      ':' +
      String(currentStartTime % 60).padStart(2, '0');
    const endTime =
      String(Math.floor(currentEndTime / 60)).padStart(2, '0') +
      ':' +
      String(currentEndTime % 60).padStart(2, '0');

    timeIntervals.push({ startTime, endTime });

    // Move to the next slot
    currentStartTime = currentEndTime;
  }

  // Map intervals to slots
  const slots = timeIntervals.map((time) => {
    return {
      service: payload?.service,
      date: payload?.date,
      startTime: time.startTime,
      endTime: time.endTime,
    };
  });

  // Save to database
  const result = await Slot.create(slots);
  return result;
};

const getAvailableSlots = async (query: Record<string, unknown>) => {
  const queryObj: Partial<{ service: string; date: string }> = {};
  if (query?.date) {
    queryObj.date = query.date as string;
  }

  if (query?.serviceId) {
    queryObj.service = query.serviceId as string;
  }

  const result = await Slot.find(queryObj);

  return result;
};

export const SlotSlot = {
  createSlot,
  getAvailableSlots,
};
