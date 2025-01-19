import { TBooking } from './booking.interface';
import { z } from 'zod';
import { vehicleTypes } from './booking.constant';

const createBookingValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'user Name is requried' }),
    email: z.string({ required_error: 'user Email is requried' }).email(),
    slot: z.string({ required_error: 'Slot is required' }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
