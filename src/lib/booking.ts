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