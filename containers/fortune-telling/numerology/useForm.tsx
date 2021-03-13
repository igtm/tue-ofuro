import { Dispatch, FormEvent, SetStateAction, useCallback } from "react";
import { calculateNumbers } from "./calculateNumbers";
import { CabalaNumber } from "./typeCabalaNumber";
import { ModernNumber } from "./typeModernNumber";

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
    },
    [args]
  );

  return {
    onSubmit: onSubmit,
  };
};
