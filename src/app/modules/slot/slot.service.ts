import { Types } from 'mongoose';
import { ServicesModel } from '../services/service.model';
import { SlotData, TSlot } from './slot.interface';
import { generateSlots } from './slot.utils';
import { SlotModel } from './slot.model';

const createSlotIntoDB = async (slotData: SlotData): Promise<TSlot[]> => {
  // Fetch the service to get its duration
  const service = await ServicesModel.findById(slotData.service);
  if (!service) {
    throw new Error('Service not found');
  }

  const serviceDuration = service.duration;
  if (!serviceDuration) {
    throw new Error('Service duration is not defined');
  }

  const slots = generateSlots(
    slotData.startTime,
    slotData.endTime,
    serviceDuration,
  );

  const slotDocuments = slots.map((slot) => ({
    service: new Types.ObjectId(slotData.service),
    date: slotData.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  }));

  const createdSlots = await SlotModel.insertMany(slotDocuments);
  return createdSlots.map((slot) => slot.toObject() as TSlot); // Convert to plain objects
};

export const SlotServices = {
  createSlotIntoDB,
};
