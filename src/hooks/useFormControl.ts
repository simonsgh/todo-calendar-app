import { ChangeEvent, useCallback, useState } from 'react';

type FormControlReturn = [string, (event: ChangeEvent<HTMLInputElement>) => void, () => void];

function useFormControl({ initialState = '' } = {}): FormControlReturn {
  const [value, setValue] = useState(initialState);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialState);
  }, [initialState]);

  return [value, handleChange, resetValue];
}

export default useFormControl;
