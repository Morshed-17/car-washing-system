import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";


const createBooking = async (payload: TBooking) => {
  const result = Booking.create(payload);
  return result;
};

// const getSingleBooking = async (id: string) => {
//   const result = Booking.findById(id);
//   return result;
// };

// const getAllBooking = async () => {
//   const result = Booking.find();
//   return result;
// };



export const BookingServices = {
  createBooking,
//   getSingleBooking,
//   getAllBooking,

};
