import React, { ChangeEvent } from 'react';

type FormControlProps = {
  name?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'datetime-local';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FormControl({
  name,
  label,
  placeholder,
  onChange,
  value = '',
  type = 'text',
  required = false,
}: FormControlProps) {
  const afterClass = required ? " after:content-['*'] after:ml-0.5 after:text-red-500" : '';
  return (
    <label className="block">
      <span className={`text-gray-700${afterClass}`}>{label}</span>
      <input
        className="block w-full bg-transparent"
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </label>
  );
}

export default FormControl;
