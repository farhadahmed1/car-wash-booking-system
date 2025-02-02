import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';
import { handleNoDataFound } from '../../errors/handleNoDataFound';

const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body;
  const result = await SlotServices.createSlotIntoDB(slotData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully!',
    data: result,
  });
});
const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllAvailableSlotsFromDB();
  if (result?.length === 0) {
    return handleNoDataFound(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrieved successfully!',
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
};
