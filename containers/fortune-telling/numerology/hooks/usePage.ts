import { ChangeEvent, useState } from "react";
import { convertStringToRome } from "../functions/convertStringToRome";
import { validateBdayDay } from "../functions/validators/validateBdayDay";
import { validateBdayMonth } from "../functions/validators/validateBdayMonth";
import { validateBdayYear } from "../functions/validators/validateBdayYear";
import { validateFamilyNameHiragana } from "../functions/validators/validateFamilyNameHiragana";
import { validateGivenNameHiragana } from "../functions/validators/validateGivenNameHiragana";
import { validateNameRome } from "../functions/validators/validateNameRome";
import { CabalaNumber } from "../models/typeCabalaNumber";
import { ModernNumber } from "../models/typeModernNumber";
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
    value: familyNameHiragana,
    errors: familyNameHiraganaErrors,
    touched: familyNameHiraganaTouched,
    handleChange: handleChangeFamilyNameHiragana,
    handleBlur: handleBlurFamilyNameHiragana,
  } = useInput("", validateFamilyNameHiragana);

  const {
    value: givenNameHiragana,
    errors: givenNameHiraganaErrors,
    touched: givenNameHiraganaTouched,
    handleChange: handleChangeGivenNameHiragana,
    handleBlur: handleBlurGivenNameHiragana,
  } = useInput("", validateGivenNameHiragana);

  const {
    value: nameRome,
    setValue: setNameRome,
    errors: nameRomeErrors,
    touched: nameRomeTouched,
    handleChange: handleChangeNameRome,
    handleBlur: handleBlurNameRome,
  } = useInput("", validateNameRome);

  const onChangeFamilyNameHiragana = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeFamilyNameHiragana(event);

    const nameRome =
      convertStringToRome(event.target.value) +
      convertStringToRome(givenNameHiragana);
    setNameRome(nameRome);
  };

  const onChangeGivenNameHiragana = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeGivenNameHiragana(event);

    const nameRome =
      convertStringToRome(familyNameHiragana) +
      convertStringToRome(event.target.value);
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
    familyNameHiraganaInputElementProps: {
      value: familyNameHiragana,
      errors: familyNameHiraganaErrors,
      touched: familyNameHiraganaTouched,
      onChange: onChangeFamilyNameHiragana,
      onBlur: handleBlurFamilyNameHiragana,
    },
    givenNameHiraganaInputElementProps: {
      value: givenNameHiragana,
      errors: givenNameHiraganaErrors,
      touched: givenNameHiraganaTouched,
      onChange: onChangeGivenNameHiragana,
      onBlur: handleBlurGivenNameHiragana,
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
