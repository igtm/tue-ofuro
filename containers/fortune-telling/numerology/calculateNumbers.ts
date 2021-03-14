import { convertAlphabetStringToNumberString } from "./convertAlphabetStringToNumberString";
import { extractConsonantString } from "./extractConsonantString";
import { extractVowelString } from "./extractVowelString";
import { CabalaNumber, isCabalaNumber } from "./typeCabalaNumber";
import { isModernNumber, ModernNumber } from "./typeModernNumber";

export const calculateNumbers = (
  bdayYear: string,
  bdayMonth: string,
  bdayDay: string,
  nameRome: string
) => {
  const lifePathNumber = calculateLifePathNumber(bdayYear, bdayMonth, bdayDay);
  const destinyNumber = calculateDestinyNumber(nameRome);

  return {
    lifePathNumber,
    destinyNumber,
    soulNumber: calculateSoulNumber(nameRome),
    personalityNumber: calculatePersonalityNumber(nameRome),
    birthdayNumber: calculateBirthdayNumber(bdayDay),
    maturityNumber: calculateMaturityNumber(lifePathNumber, destinyNumber),
    pastNumber: calculatePastNumber(bdayDay),
    presentNumber: calculatePresentNumber(bdayYear, bdayMonth, bdayDay),
    futureNumber: calculateFutureNumber(bdayMonth, bdayDay),
  };
};

const calculateLifePathNumber = (
  bdayYear: string,
  bdayMonth: string,
  bdayDay: string
) => {
  return calculateModernNumber(bdayYear + bdayMonth + bdayDay);
};

const calculateDestinyNumber = (nameRome: string) => {
  const numberString = convertAlphabetStringToNumberString(nameRome);
  return calculateModernNumber(numberString);
};

const calculateSoulNumber = (nameRome: string) => {
  const vowelString = extractVowelString(nameRome);
  const numberString = convertAlphabetStringToNumberString(vowelString);
  return calculateModernNumber(numberString);
};

const calculatePersonalityNumber = (nameRome: string) => {
  const vowelString = extractConsonantString(nameRome);
  const numberString = convertAlphabetStringToNumberString(vowelString);
  return calculateModernNumber(numberString);
};

const calculateBirthdayNumber = (bdayDay: string) => {
  return calculateModernNumber(bdayDay);
};

const calculateMaturityNumber = (
  lifePathNumber?: ModernNumber,
  destinyNumber?: ModernNumber
) => {
  if (lifePathNumber == null || destinyNumber == null) {
    return;
  }
  return calculateModernNumber(`${lifePathNumber}${destinyNumber}`);
};

const calculatePastNumber = (bdayDay: string) => {
  return calculateCabalaNumber(bdayDay);
};

const calculatePresentNumber = (
  bdayYear: string,
  bdayMonth: string,
  bdayDay: string
) => {
  return calculateCabalaNumber(bdayYear + bdayMonth + bdayDay);
};

const calculateFutureNumber = (bdayMonth: string, bdayDay: string) => {
  return calculateCabalaNumber(bdayMonth + bdayDay);
};

const calculateModernNumber = (
  numberString: string
): ModernNumber | undefined => {
  const number = parseInt(numberString, 10);
  if (isNaN(number)) {
    return;
  }

  if (isModernNumber(number)) {
    return number;
  }

  const sum = Array.from(numberString).reduce<number | undefined>(
    (acc, value) => {
      const number = parseInt(value, 10);
      if (isNaN(number)) {
        return acc;
      }

      if (acc == null) {
        return number;
      }

      return acc + number;
    },
    undefined
  );

  return calculateModernNumber(`${sum}`);
};

const calculateCabalaNumber = (
  numberString: string
): CabalaNumber | undefined => {
  const number = parseInt(numberString, 10);
  if (isNaN(number)) {
    return;
  }

  if (isCabalaNumber(number)) {
    return number;
  }

  const sum = Array.from(numberString).reduce<number | undefined>(
    (acc, value) => {
      const number = parseInt(value, 10);
      if (isNaN(number)) {
        return acc;
      }

      if (acc == null) {
        return number;
      }

      return acc + number;
    },
    undefined
  );

  return calculateCabalaNumber(`${sum}`);
};
