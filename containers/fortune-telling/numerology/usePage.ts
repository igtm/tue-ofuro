import { ChangeEvent, useState } from "react";
import { convertStringToRome } from "./convertStringToRome";
import { CabalaNumber } from "./typeCabalaNumber";
import { ModernNumber } from "./typeModernNumber";
import { useForm } from "./useForm";
import { useInput } from "./useInput";

export const usePage = () => {
  const [lifePathNumber, setLifePathNumber] = useState<
    ModernNumber | undefined
  >();

  const [destinyNumber, setDestinyNumber] = useState<
    ModernNumber | undefined
  >();

  const [soulNumber, setSoulNumber] = useState<ModernNumber | undefined>();

  const [personalityNumber, setPersonalityNumber] = useState<
    ModernNumber | undefined
  >();

  const [birthdayNumber, setBirthdayNumber] = useState<
    ModernNumber | undefined
  >();

  const [maturityNumber, setMaturityNumber] = useState<
    ModernNumber | undefined
  >();

  const [pastNumber, setPastNumber] = useState<CabalaNumber | undefined>();

  const [presentNumber, setPresentNumber] = useState<
    CabalaNumber | undefined
  >();

  const [futureNumber, setFutureNumber] = useState<CabalaNumber | undefined>();

  const { value: bdayYear, handleChange: handleChangeBdayYear } = useInput();

  const { value: bdayMonth, handleChange: handleChangeBdayMonth } = useInput();

  const { value: bdayDay, handleChange: handleChangeBdayDay } = useInput();

  const {
    value: nameHiragana,
    handleChange: handleChangeNameHiragana,
  } = useInput();

  const {
    value: nameRome,
    setValue: setNameRome,
    handleChange: handleChangeNameRome,
  } = useInput();

  const onChangeNameHiragana = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeNameHiragana(event);

    const nameRome = convertStringToRome(event.target.value);
    setNameRome(nameRome);
  };

  const { onSubmit } = useForm({
    bdayYear,
    bdayMonth,
    bdayDay,
    nameRome,
    setLifePathNumber,
    setDestinyNumber,
    setSoulNumber,
    setPersonalityNumber,
    setBirthdayNumber,
    setMaturityNumber,
    setPastNumber,
    setPresentNumber,
    setFutureNumber,
  });

  return {
    numbers: {
      lifePathNumber,
      destinyNumber,
      soulNumber,
      personalityNumber,
      birthdayNumber,
      maturityNumber,
      pastNumber,
      presentNumber,
      futureNumber,
    },
    bdayYearInputElementProps: {
      value: bdayYear,
      onChange: handleChangeBdayYear,
    },
    bdayMonthInputElementProps: {
      value: bdayMonth,
      onChange: handleChangeBdayMonth,
    },
    bdayDayInputElementProps: {
      value: bdayDay,
      onChange: handleChangeBdayDay,
    },
    nameHiraganaInputElementProps: {
      value: nameHiragana,
      onChange: onChangeNameHiragana,
    },
    nameRomeInputElementProps: {
      value: nameRome,
      onChange: handleChangeNameRome,
    },
    formElementProps: {
      onSubmit,
    },
  };
};
