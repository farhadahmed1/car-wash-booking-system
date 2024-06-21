const twoDigitFormattedNumber = (num: number): string =>
  num < 10 ? `0${num}` : `${num}`;

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${twoDigitFormattedNumber(hours)}:${twoDigitFormattedNumber(mins)}`;
};

// Pattern for validating MongoDB ObjectId
export const objectIdPattern = /^[0-9a-fA-F]{24}$/;
