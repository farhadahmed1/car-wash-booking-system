import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const servicesSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    isDeleted: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const ServicesModel = model<TService>('Services', servicesSchema);
