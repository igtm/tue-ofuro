import { ChangeEvent, useCallback, useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValue(value);
  }, []);

  return {
    value: value,
    setValue: setValue,
    handleChange: handleChange,
  };
};
