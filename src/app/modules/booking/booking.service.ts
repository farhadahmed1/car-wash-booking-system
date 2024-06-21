import { ServicesModel } from '../services/service.model';
import { SlotModel } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking, TBookingRequest } from './booking.interface';
import { BookingModel } from './booking.model';

const createBookingIntoDB = async (
  email: string,
  bookingData: TBookingRequest,
) => {
  //   console.log(bookingData)
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new Error('User not found');
  }
  const serviceInfo = await ServicesModel.findById({
    _id: bookingData?.serviceId,
  });
  if (!serviceInfo) {
    throw new Error('Service not found');
  }
  const slotInfo = await SlotModel.findById({ _id: bookingData?.slotId });
  if (!slotInfo) {
    throw new Error('Slot not found');
  }

  slotInfo.isBooked = 'booked';
  await slotInfo.save();

  const newBookingData: Partial<TBooking> = {
    customer: userInfo._id,
    service: serviceInfo._id,
    slot: slotInfo._id,
    vehicleType: bookingData.vehicleType,
    vehicleBrand: bookingData.vehicleBrand,
    vehicleModel: bookingData.vehicleModel,
    manufacturingYear: bookingData.manufacturingYear,
    registrationPlate: bookingData.registrationPlate,
  };

  const newBooking = await BookingModel.create(newBookingData);

  const populatedBooking = await BookingModel.findById(newBooking._id)
    .populate('customer', '_id name email phone address')
    .populate('service', '_id name description price duration isDeleted')
    .populate('slot', '_id service date startTime endTime isBooked')
    .lean();

  return populatedBooking;
};

export const bookingServices = {
  createBookingIntoDB,
};
