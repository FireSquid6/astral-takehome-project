

export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const firstSunday = new Date(start);

  while (firstSunday.getDay() !== 0) {
    firstSunday.setDate(firstSunday.getDate() + 1);
  }

  if (now < firstSunday) {
    return 1;
  }

  const days = Math.floor((now.getTime() - firstSunday.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.floor(days / 7) + 2; // +2 because: +1 for 0-indexed to 1-indexed, +1 for week before first Sunday

  return weekNumber;
}

export function getDaysInWeek(year: number, n: number): string[] {
  if (n < 1 || n > 53) {
    throw new Error('Week number must be between 1 and 53');
  }
  
  const firstDay = new Date(year, 0, 1);
  
  const firstSunday = new Date(firstDay);
  while (firstSunday.getDay() !== 0) {
    firstSunday.setDate(firstSunday.getDate() + 1);
  }
  
  const startDate = new Date(firstSunday);
  startDate.setDate(firstSunday.getDate() + (n - 2) * 7);
  
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const formattedDate = currentDate.toISOString().split('T')[0];
    days.push(formattedDate);
  }
  
  return days;
}
