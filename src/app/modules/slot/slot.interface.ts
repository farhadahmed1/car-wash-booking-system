import { Types } from 'mongoose';

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: 'booked' | 'available' | 'canceled';
};

export interface SlotData {
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface SlotTime {
  startTime: string;
  endTime: string;
}
