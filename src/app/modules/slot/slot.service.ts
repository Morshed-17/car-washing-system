import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

;

const createSlot = async (payload: TSlot) => {
  const result = Slot.create(payload);
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
  deleteSlot
};
