
export const formatTime = (date: Date, is24Hour: boolean): { hours: string; minutes: string; seconds: string; period: string } => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  let period = '';

  if (!is24Hour) {
    period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  }

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes,
    seconds,
    period
  };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const getTimeInZone = (timezone: string): Date => {
  const date = new Date();
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
};
