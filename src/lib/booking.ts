export const BOOKING_TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToTimeString = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:00`;
};

export const bookingsOverlap = (
  candidateStartTime: string,
  candidateDurationMinutes: number,
  existingStartTime: string,
  existingDurationMinutes: number,
) => {
  const candidateStart = timeToMinutes(candidateStartTime);
  const candidateEnd = candidateStart + candidateDurationMinutes;
  const existingStart = timeToMinutes(existingStartTime);
  const existingEnd = existingStart + existingDurationMinutes;

  return candidateStart < existingEnd && existingStart < candidateEnd;
};