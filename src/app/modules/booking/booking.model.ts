import { Schema, model } from 'mongoose';
import { TSlot } from './booking.interface';

const SlotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Services',
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      enum: ['booked', 'available', 'canceled'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

export const SlotModel = model<TSlot>('Slot', SlotSchema);
