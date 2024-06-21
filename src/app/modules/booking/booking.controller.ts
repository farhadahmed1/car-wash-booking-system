import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getUserInfoFromToken } from '../../utils/getUserInfoFromToken';
import { bookingServices } from './booking.service';
import { BookingModel } from './booking.model';
import { handleNoDataFound } from '../../errors/handleNoDataFound';

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const bookingData = req.body;

  const { email } = getUserInfoFromToken(token as string);

  const result = await bookingServices.createBookingIntoDB(email, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully!',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  // const result = await Service.find()
  const result = await BookingModel.find()
    .populate('customer', '_id name email phone address')
    .populate('service', '_id name description price duration isDeleted')
    .populate('slot', '_id service date startTime endTime isBooked')
    .lean();

  if (result?.length === 0) {
    return handleNoDataFound(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is retrieved successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
};
