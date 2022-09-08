import React, { useMemo } from 'react';

import { formatHours } from '../../utils/dates';

import { ReactComponent as DataObjectIcon } from '../../assets/svg/DataObject.svg';

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
    <div className="grid grid-rows-2 px-1 group">
      <div>
        <div className="whitespace-nowrap">{date}</div>
      </div>
      <div className="flex gap-0.5 items-center">
        <div>
          <div className="h-2 w-2" style={{ backgroundColor: webhook.color }}></div>
        </div>
        <div className="w-full pl-1" title={webhook.name}>
          {webhook.path}
        </div>
        <div>
          <DataObjectIcon title={body} className="block h-5 w-5 invisible group-hover:visible" />
        </div>
      </div>
    </div>
  );
}

export default CalendarWebhook;
