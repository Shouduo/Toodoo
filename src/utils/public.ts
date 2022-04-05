//
export const durationParser = (duration: number): string => {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
