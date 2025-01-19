import { Types } from 'mongoose';

export type TBooking = {
  user?: Types.ObjectId;
  slot: Types.ObjectId;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  transactionId: string;
  totalPrice: number;
};

export type TPaymentData = {
  transactionId: string;
  totalPrice: number;
  customerName: string;
  customerAddress: string; // Fixed the typo in "customerAddres"
  customerEmail: string;
  customerPhone?: string; // Marked as optional since `userData?.phone` may be undefined
};
