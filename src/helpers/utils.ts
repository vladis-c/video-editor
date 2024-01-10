export const wait = async (ms: number) => {
  return await new Promise<void>(resolve => setTimeout(resolve, ms));
};

export const roundToThousands = (num: number): number => {
  return Math.round(num / 1000) * 1000;
};

export const getFormattedTime = (
  milliseconds: number,
  format?: 'HH:MM:SS' | 'MM:SS' | 'M:SS',
): string => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  if (format === 'M:SS') {
    const formattedMinutesNoZero =
      minutes === 0 ? '0' : minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSecondsNoZero = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutesNoZero}:${formattedSecondsNoZero}`;
  } else if (format === 'MM:SS') {
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
};
