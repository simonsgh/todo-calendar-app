import React, { useEffect, useMemo, useState } from 'react';

import useSocket from '../../hooks/useSocket';
import useWeek from '../../hooks/useWeek';
import ConfigService from '../../services/ConfigService';
import { getWeekStart, WEEK_MS } from '../../utils/dates';

import CalendarEvent, { ICalendarEvent } from '../CalendarEvent/CalendarEvent';
import CalendarWebhook, { ICalendarWebhook } from '../CalendarWebhook/CalendarWebhook';

import { ReactComponent as NavigateBeforeIcon } from '../../assets/svg/NavigateBefore.svg';
import { ReactComponent as NavigateNextIcon } from '../../assets/svg/NavigateNext.svg';
import { ReactComponent as ScheduleIcon } from '../../assets/svg/Schedule.svg';
import { ReactComponent as WebhookIcon } from '../../assets/svg/Webhook.svg';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekStart = ConfigService.getWeekStart();
const getWeekDayClassName = (weekDay: any): string => {
  if (weekDay.isToday) {
    return 'text-blue-700';
  }

  if (weekDay.isWeekEnd) {
    return 'text-red-700';
  }

  return '';
};

function Calendar() {
  const socket = useSocket();
  const [events, setEvents] = useState<ICalendarEvent[]>([]);
  const [webhooks, setWebhooks] = useState<ICalendarWebhook[]>([]);
  const eventsByStart = useMemo(
    () =>
      events.reduce((acc: any, event) => {
        const start = new Date(event.start);
        start.setHours(0, 0, 0, 0);
        const startTime = start.getTime();
        if (!acc[startTime]) {
          acc[startTime] = [];
        }

        acc[startTime].push(event);
        return acc;
      }, {}),
    [events],
  );

  const webhooksByDate = useMemo(
    () =>
      webhooks.reduce((acc: any, webhook) => {
        const date = new Date(webhook.date);
        date.setHours(0, 0, 0, 0);
        const dateTime = date.getTime();
        if (!acc[dateTime]) {
          acc[dateTime] = [];
        }

        acc[dateTime].push(webhook);
        return acc;
      }, {}),
    [webhooks],
  );

  useEffect(() => {
    socket.on('events', (data: ICalendarEvent[]) => {
      setEvents(data);
    });

    return () => {
      socket.off('events');
    };
  }, []);

  useEffect(() => {
    socket.on('webhooks', (data: ICalendarWebhook[]) => {
      setWebhooks(data);
    });

    return () => {
      socket.off('webhooks');
    };
  }, []);

  const [from, setFrom] = useState(weekStart);
  const week = useWeek({ from });
  const weekEvents = useMemo(
    () =>
      week.days.map((day) => {
        const startTime = day.date.getTime();
        const dayEvents = eventsByStart[startTime] ?? [];
        const dayWebhooks = webhooksByDate[startTime] ?? [];
        return { ...day, events: dayEvents, webhooks: dayWebhooks };
      }),
    [eventsByStart, webhooksByDate, week],
  );

  const title = useMemo(() => {
    const month = from.getMonth();
    return `${months[month]} ${from.getFullYear()}`;
  }, [from]);

  const handleClickBefore = () => {
    const nextFrom = new Date(from.getTime() - WEEK_MS);
    ConfigService.setWeekStart(nextFrom);
    setFrom(nextFrom);
  };

  const handleClickNext = () => {
    const nextFrom = new Date(from.getTime() + WEEK_MS);
    ConfigService.setWeekStart(nextFrom);
    setFrom(nextFrom);
  };

  const handleClickToday = () => {
    const nextFrom = getWeekStart();
    ConfigService.setWeekStart(nextFrom);
    setFrom(nextFrom);
  };

  return (
    <div className="grid gap-1">
      <div className="flex">
        <div className="w-full">
          <h2 className="text-2xl text-center">{title}</h2>
        </div>
        <div className="text-2xl whitespace-nowrap">
          <button type="button" onClick={handleClickBefore} title="Week before">
            <NavigateBeforeIcon className="inline-block h-5 w-5" />
          </button>
          <button type="button" onClick={handleClickToday} title="Week number">
            {week.num}
          </button>
          <button type="button" onClick={handleClickNext} title="Next week">
            <NavigateNextIcon className="inline-block h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 divide-x auto-rows-max">
        {weekEvents.map((weekDay) => (
          <div key={weekDay.id} className="divide-y">
            <div className={`text-center ${getWeekDayClassName(weekDay)}`}>{weekDay.name}</div>
            <div className={`text-3xl text-center ${getWeekDayClassName(weekDay)}`}>
              {weekDay.date.getDate()}
            </div>
            {weekDay.events.length > 0 && (
              <div className="text-center">
                <ScheduleIcon className="inline-block h-5 w-5" />
              </div>
            )}
            {weekDay.events.map((event: any) => (
              <CalendarEvent key={event._id} event={event} />
            ))}
            {weekDay.webhooks.length > 0 && (
              <div className="text-center">
                <WebhookIcon className="inline-block h-5 w-5" />
              </div>
            )}
            {weekDay.webhooks.map((webhook: any) => (
              <CalendarWebhook key={webhook._id} webhook={webhook} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
