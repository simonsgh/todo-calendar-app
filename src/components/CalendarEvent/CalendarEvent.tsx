import React, { useMemo } from 'react';

import useEmitter from '../../hooks/useEmitter';
import { formatHours } from '../../utils/dates';

import { ReactComponent as CloseIcon } from '../../assets/svg/Close.svg';

export interface ICalendarEvent {
  _id: string;
  name: string;
  start: string;
  end: string;
  color: string;
  path: string;
}

function CalendarEvent({ event }: { event: ICalendarEvent }) {
  const [deleteEvent, { isLoading: isLoadingDelete }] = useEmitter({ event: 'events.delete' });
  const handleClickDelete = async () => {
    await deleteEvent({ id: event._id });
  };

  const start = useMemo(() => formatHours(event.start), [event]);
  const end = useMemo(() => formatHours(event.end), [event]);
  return (
    <div className="grid grid-rows-2 px-1 group">
      <div>
        <div className="whitespace-nowrap">
          <span title={event.start}>{start}</span> - <span title={event.end}>{end}</span>
        </div>
      </div>
      <div className="flex gap-0.5 items-center">
        <div>
          <div className="h-2 w-2" style={{ backgroundColor: event.color }}></div>
        </div>
        <div className="w-full pl-1" title={event.path}>
          {event.name}
        </div>
        <div>
          <button
            className="invisible group-hover:visible"
            disabled={isLoadingDelete}
            onClick={handleClickDelete}
            title="Delete"
          >
            <CloseIcon className="block h-3 w-3 fill-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarEvent;
