import mongoose, { model, Schema, Types } from 'mongoose';

import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Slot',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },

    transactionId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
