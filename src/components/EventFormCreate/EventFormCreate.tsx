import React, { useMemo } from 'react';

import useEmitter from '../../hooks/useEmitter';
import { tailwindColors } from '../../constants/colors';

import EventForm, { EventDTO } from '../EventForm/EventForm';

function EventFormCreate() {
  const [createEvent, { isLoading }] = useEmitter<EventDTO>({
    event: 'events.create',
  });

  const datetime = useMemo(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const start = `${now.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
    return { start, end: start };
  }, []);

  const handleSubmit = async (values: EventDTO) => {
    await createEvent(values);
  };

  return (
    <EventForm
      name=""
      path=""
      start={datetime.start}
      end={datetime.end}
      color={tailwindColors[0].color}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonLabel="Create"
    />
  );
}

export default EventFormCreate;
