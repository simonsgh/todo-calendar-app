import { useMemo } from 'react';

import { DAY_MS, weekDays } from '../utils/dates';

const useWeek = ({ from = new Date() } = {}) => {
  return useMemo(() => {
    const days: any[] = [];

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();

    const current = new Date(from);
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDate = current.getDate() - current.getDay();
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(year, month, firstDate + day);
      const isToday =
        year === todayYear && month === todayMonth && date.getDate() === today.getDate();

      const isWeekEnd = day === 0 || day === 6;
      days.push({ date, isToday, isWeekEnd, id: day, name: weekDays[day] });
    }

    const january = new Date(year, 0, 1);
    const diff = Math.floor((current.getTime() - january.getTime()) / DAY_MS);
    const num = Math.ceil(diff / 7);
    return { days, num };
  }, [from]);
};

export default useWeek;
