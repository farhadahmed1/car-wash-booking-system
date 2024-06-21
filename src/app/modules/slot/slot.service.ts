/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { ServicesModel } from '../services/service.model';
import { SlotData, TSlot } from './slot.interface';
import { generateSlots } from './slot.utils';
import { SlotModel } from './slot.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

const getAllAvailableSlotsFromDB = async (query?: {
  date?: string;
  serviceId?: string;
}) => {
  if (query && Object.keys(query).length > 0) {
    let result: any;
    const { date, serviceId } = query;
    if (date) {
      result = await SlotModel.find({ date: { $in: date } });
    }
    if (serviceId) {
      result = await SlotModel.find({ service: { $in: serviceId } });
    }

    if (result?.length <= 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    }

    return result;
  } else {
    const result = await SlotModel.find().populate({
      path: 'service',
      match: { isDeleted: { $ne: true } },
    });
    return result;
  }
};
// const getAllAvailableSlotsFromDB = async (query: Record<string, undefined>) => {
//   const slotQuery = new QueryBuilder(
//     SlotModel.find().populate({
//       path: 'service',
//       match: { isDeleted: { $ne: true } },
//     }),
//     query,
//   )
//     .search(slotSearchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await slotQuery.modelQuery;
//   return result;
// };
export const SlotServices = {
  createSlotIntoDB,
  getAllAvailableSlotsFromDB,
};
