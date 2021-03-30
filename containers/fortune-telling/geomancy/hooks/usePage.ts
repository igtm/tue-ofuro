import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { calculateGeomancySymbol } from "../functions/calculateGeomancySymbol";
import { GeomancySymbol } from "../models/typeGeomancySymbol";
import { useCounter } from "./useCounter";

export const usePage = () => {
  const {
    count: count1,
    onClickCounter: onClickCounter1,
    reset: reset1,
  } = useCounter();

  const {
    count: count2,
    onClickCounter: onClickCounter2,
    reset: reset2,
  } = useCounter();

  const {
    count: count3,
    onClickCounter: onClickCounter3,
    reset: reset3,
  } = useCounter();

  const {
    count: count4,
    onClickCounter: onClickCounter4,
    reset: reset4,
  } = useCounter();

  const disabled = useMemo(() => {
    if (count1 === 0) {
      return {
        counter1: false,
        counter2: true,
        counter3: true,
        counter4: true,
        submit: true,
      };
    } else if (count2 === 0) {
      return {
        counter1: false,
        counter2: false,
        counter3: true,
        counter4: true,
        submit: true,
      };
    } else if (count3 === 0) {
      return {
        counter1: true,
        counter2: false,
        counter3: false,
        counter4: true,
        submit: true,
      };
    } else if (count4 === 0) {
      return {
        counter1: true,
        counter2: true,
        counter3: false,
        counter4: false,
        submit: true,
      };
    } else {
      return {
        counter1: true,
        counter2: true,
        counter3: true,
        counter4: false,
        submit: false,
      };
    }
  }, [count1, count2, count3, count4]);

  const [geomancySymbol, setGeomancySymbol] = useState<
    GeomancySymbol | undefined
  >();

  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setGeomancySymbol(
        calculateGeomancySymbol(count1, count2, count3, count4)
      );
      reset1();
      reset2();
      reset3();
      reset4();

      const targetClientRectTop = scrollTargetRef.current?.getBoundingClientRect()
        .top;
      if (targetClientRectTop != null) {
        window.scrollTo({
          top: window.scrollY + targetClientRectTop - 72, // 72 はヘッダー避けやスクロール位置の余白などを計算する適当な値
          left: 0,
          behavior: "smooth",
        });
      }
    },
    [count1, count2, count3, count4, reset1, reset2, reset3, reset4]
  );

  return {
    counter1: {
      count: count1,
      onClickCounter: onClickCounter1,
    },
    counter2: {
      count: count2,
      onClickCounter: onClickCounter2,
    },
    counter3: {
      count: count3,
      onClickCounter: onClickCounter3,
    },
    counter4: {
      count: count4,
      onClickCounter: onClickCounter4,
    },
    disabled,
    onSubmit,
    geomancySymbol,
    scrollTargetRef,
  };
};
