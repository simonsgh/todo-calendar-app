import React, { ChangeEvent, FormEvent, useState } from 'react';

import useFormControl from '../../hooks/useFormControl';
import { tailwindColors } from '../../constants/colors';
import { webhookApi } from '../../utils/environment';

import FormControl from '../FormControl/FormControl';

export interface EventDTO {
  name: string;
  start: string;
  end: string;
  color: string;
  path: string;
}

interface EventFormProps extends EventDTO {
  onSubmit: (values: EventDTO) => Promise<void>;
  isLoading: boolean;
  buttonLabel: string;
}

const webhooksURL = `${webhookApi}/webhooks`;

function EventForm({
  name: initialName,
  start: initialStart,
  end: initialEnd,
  color: initialColor,
  path: initialPath,
  onSubmit,
  isLoading,
  buttonLabel,
}: EventFormProps) {
  const [name, handleChangeName] = useFormControl({ initialState: initialName });
  const [start, handleChangeStart] = useFormControl({ initialState: initialStart });
  const [end, handleChangeEnd] = useFormControl({ initialState: initialEnd });
  const [path, handleChangePath] = useFormControl({ initialState: initialPath });
  const [color, setColor] = useState(initialColor);
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startISO = new Date(start).toISOString();
    const endISO = new Date(end).toISOString();
    await onSubmit({ color, name, path, start: startISO, end: endISO });

    // resetName();
    // resetStart();
    // resetEnd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-1">
        <h2 className="text-2xl">New event</h2>
        <FormControl
          required
          name="name"
          label="Name"
          placeholder="Event"
          value={name}
          onChange={handleChangeName}
        />
        <FormControl
          required
          type="datetime-local"
          name="start"
          label="Start"
          value={start}
          onChange={handleChangeStart}
        />
        <FormControl
          required
          type="datetime-local"
          name="end"
          label="End"
          value={end}
          onChange={handleChangeEnd}
        />
        <div>
          <div>
            <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Color
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {tailwindColors.map((tailwindColor) => (
              <label key={tailwindColor.color}>
                <input
                  className={`${tailwindColor.border} ${tailwindColor.text}`}
                  type="radio"
                  name="color"
                  value={tailwindColor.color}
                  checked={color === tailwindColor.color}
                  onChange={handleChangeColor}
                />{' '}
                {tailwindColor.label}
              </label>
            ))}
          </div>
        </div>
        <FormControl
          name="path"
          label="Path"
          placeholder="/unique-event-path"
          value={path}
          onChange={handleChangePath}
        />
        {path && (
          <div className="text-xs text-gray-700">
            <sup>*</sup> Webhook url is{' '}
            <code>
              {webhooksURL}
              {path}
            </code>
          </div>
        )}
        <button
          disabled={isLoading}
          className="mt-3 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white font-bold py-2 px-4 rounded block w-full"
          type="submit"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}

export default EventForm;
