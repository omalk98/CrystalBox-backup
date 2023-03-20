const formatDate = (date, dateDelimiter = '-', timeDelimiter = ':') => {
  if (!date) return '';
  const hasTime = date.includes('T');
  let newDate = date;
  let time = '';
  let timeSlots = [];
  if (hasTime) {
    const parts = date.split('T');
    [newDate, time] = parts;
  }
  const dateSlots = newDate.split(dateDelimiter);
  timeSlots = time.split(timeDelimiter);
  const seconds = timeSlots.pop().split('.')[0];
  timeSlots.push(seconds);
  dateSlots[1] = parseInt(dateSlots[1], 10) - 1;

  return new Date(...dateSlots, ...timeSlots);
};

export default formatDate;

export const weekdays = [
  { name: 'Sunday', num: 1 },
  { name: 'Monday', num: 2 },
  { name: 'Tuesday', num: 3 },
  { name: 'Wednesday', num: 4 },
  { name: 'Thursday', num: 5 },
  { name: 'Friday', num: 6 },
  { name: 'Saturday', num: 7 }
];
export const months = [
  { name: 'January', num: 1 },
  { name: 'February', num: 2 },
  { name: 'March', num: 3 },
  { name: 'April', num: 4 },
  { name: 'May', num: 5 },
  { name: 'June', num: 6 },
  { name: 'July', num: 7 },
  { name: 'August', num: 8 },
  { name: 'September', num: 9 },
  { name: 'October', num: 10 },
  { name: 'November', num: 11 },
  { name: 'December', num: 12 }
];
