import { ChangeEvent, useState } from "react";
import { convertStringToRome } from "./convertStringToRome";
import { CabalaNumber } from "./typeCabalaNumber";
import { ModernNumber } from "./typeModernNumber";
import { useForm } from "./useForm";
import { useInput } from "./useInput";
import { validateBdayDay } from "./validateBdayDay";
import { validateBdayMonth } from "./validateBdayMonth";
import { validateBdayYear } from "./validateBdayYear";
import { validateNameHiragana } from "./validateNameHiragana";
import { validateNameRome } from "./validateNameRome";

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

  const {
    value: bdayYear,
    errors: bdayYearErrors,
    touched: bdayYearTouched,
    handleChange: handleChangeBdayYear,
    handleBlur: handleBlurBdayYear,
  } = useInput("", validateBdayYear);

  const {
    value: bdayMonth,
    errors: bdayMonthErrors,
    touched: bdayMonthTouched,
    handleChange: handleChangeBdayMonth,
    handleBlur: handleBlurBdayMonth,
  } = useInput("", validateBdayMonth);

  const {
    value: bdayDay,
    errors: bdayDayErrors,
    touched: bdayDayTouched,
    handleChange: handleChangeBdayDay,
    handleBlur: handleBlurBdayDay,
  } = useInput("", validateBdayDay);

  const {
    value: nameHiragana,
    errors: nameHiraganaErrors,
    touched: nameHiraganaTouched,
    handleChange: handleChangeNameHiragana,
    handleBlur: handleBlurNameHiragana,
  } = useInput("", validateNameHiragana);

  const {
    value: nameRome,
    setValue: setNameRome,
    errors: nameRomeErrors,
    touched: nameRomeTouched,
    handleChange: handleChangeNameRome,
    handleBlur: handleBlurNameRome,
  } = useInput("", validateNameRome);

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
      errors: bdayYearErrors,
      touched: bdayYearTouched,
      onChange: handleChangeBdayYear,
      onBlur: handleBlurBdayYear,
    },
    bdayMonthInputElementProps: {
      value: bdayMonth,
      errors: bdayMonthErrors,
      touched: bdayMonthTouched,
      onChange: handleChangeBdayMonth,
      onBlur: handleBlurBdayMonth,
    },
    bdayDayInputElementProps: {
      value: bdayDay,
      errors: bdayDayErrors,
      touched: bdayDayTouched,
      onChange: handleChangeBdayDay,
      onBlur: handleBlurBdayDay,
    },
    nameHiraganaInputElementProps: {
      value: nameHiragana,
      errors: nameHiraganaErrors,
      touched: nameHiraganaTouched,
      onChange: onChangeNameHiragana,
      onBlur: handleBlurNameHiragana,
    },
    nameRomeInputElementProps: {
      value: nameRome,
      errors: nameRomeErrors,
      touched: nameRomeTouched,
      onChange: handleChangeNameRome,
      onBlur: handleBlurNameRome,
    },
    formElementProps: {
      onSubmit,
    },
  };
};
