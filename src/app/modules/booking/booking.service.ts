import { Types } from 'mongoose';
import { ServicesModel } from '../services/service.model';
import { SlotData, TSlot } from './booking.interface';
import { generateSlots } from './booking.utils';
import { SlotModel } from './booking.model';

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

const getAllAvailableSlotsFromDB = async () => {
  const result = await SlotModel.find({ isBooked: { $ne: 'booked' } }).populate(
    {
      path: 'service',
      match: { isDeleted: { $ne: true } },
    },
  );
  const filteredResult = result.filter((slot) => slot.service !== null);
  return filteredResult;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllAvailableSlotsFromDB,
};
