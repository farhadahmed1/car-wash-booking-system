import { minutesToTime, timeToMinutes } from './slot.constant';
import { SlotTime } from './slot.interface';

export const generateSlots = (
  startTime: string,
  endTime: string,
  serviceDuration: number,
): SlotTime[] => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;
  const numSlots = Math.floor(totalDuration / serviceDuration);
  const slots: SlotTime[] = [];

  for (let i = 0; i < numSlots; i++) {
    const slotStart = minutesToTime(startMinutes + i * serviceDuration);
    const slotEnd = minutesToTime(startMinutes + (i + 1) * serviceDuration);
    slots.push({ startTime: slotStart, endTime: slotEnd });
  }

  return slots;
};
