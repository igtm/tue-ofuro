import { MouseEvent, useCallback, useState } from "react";

const initialCount = 0;

export const useCounter = () => {
  const [count, setCount] = useState(initialCount);

  const onClickCounter = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCount((count) => count + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(() => initialCount);
  }, []);

  return {
    count,
    onClickCounter,
    reset,
  };
};
