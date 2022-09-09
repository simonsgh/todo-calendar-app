import React, { useMemo } from 'react';

import { formatHours } from '../../utils/dates';

export interface ICalendarWebhook {
  _id: string;
  path: string;
  name: string;
  date: string;
  color: string;
  body: string;
}

function CalendarWebhook({ webhook }: { webhook: ICalendarWebhook }) {
  const date = useMemo(() => formatHours(webhook.date), [webhook]);
  const body = useMemo(() => JSON.stringify(webhook.body, null, 2), [webhook]);
  return (
    <div className="p-1 group">
      <div>
        <time className="whitespace-nowrap" dateTime={webhook.date} title={webhook.date}>
          {date}
        </time>
        <span className="pl-1">{webhook.path}</span>
      </div>
      <details>
        <summary className="cursor-pointer" style={{ color: webhook.color }}>
          <span className="text-black">{webhook.name}</span>
        </summary>
        <output>{body}</output>
      </details>
    </div>
  );
}

export default CalendarWebhook;
