import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { calculateNumbers } from "../functions/calculateNumbers";
import { CabalaNumber } from "../models/typeCabalaNumber";
import { ModernNumber } from "../models/typeModernNumber";

type Args = {
  bdayYear: string;
  bdayMonth: string;
  bdayDay: string;
  nameRome: string;
  setLifePathNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setDestinyNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setSoulNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setPersonalityNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setBirthdayNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setMaturityNumber: Dispatch<SetStateAction<ModernNumber | undefined>>;
  setPastNumber: Dispatch<SetStateAction<CabalaNumber | undefined>>;
  setPresentNumber: Dispatch<SetStateAction<CabalaNumber | undefined>>;
  setFutureNumber: Dispatch<SetStateAction<CabalaNumber | undefined>>;
};

export const useForm = (args: Args) => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const {
        lifePathNumber,
        destinyNumber,
        soulNumber,
        personalityNumber,
        birthdayNumber,
        maturityNumber,
        pastNumber,
        presentNumber,
        futureNumber,
      } = calculateNumbers(
        args.bdayYear,
        args.bdayMonth,
        args.bdayDay,
        args.nameRome
      );

      args.setLifePathNumber(lifePathNumber);
      args.setDestinyNumber(destinyNumber);
      args.setSoulNumber(soulNumber);
      args.setPersonalityNumber(personalityNumber);
      args.setBirthdayNumber(birthdayNumber);
      args.setMaturityNumber(maturityNumber);
      args.setPastNumber(pastNumber);
      args.setPresentNumber(presentNumber);
      args.setFutureNumber(futureNumber);

      const targetClientRectTop =
        scrollTargetRef.current?.getBoundingClientRect().top;
      if (targetClientRectTop != null) {
        window.scrollTo({
          top: window.scrollY + targetClientRectTop - 72, // 72 はヘッダー避けやスクロール位置の余白などを計算する適当な値
          left: 0,
          behavior: "smooth",
        });
      }
    },
    [args]
  );

  return {
    onSubmit,
    scrollTargetRef,
  };
};
