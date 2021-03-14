import { ChangeEvent, useCallback, useMemo, useState } from "react";

export const useInput = (
  initialValue: string,
  validator?: (value: string) => string[]
) => {
  const [value, setValue] = useState(initialValue);
  const errors = useMemo(() => {
    return validator?.(value) ?? [];
  }, [validator, value]);
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValue(value);
    setTouched(true);
  }, []);

  const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTouched(true);
  }, []);

  return {
    value,
    setValue,
    errors,
    touched,
    handleChange,
    handleBlur,
  };
};
