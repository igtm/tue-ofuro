export const validateBdayYear = (value: string) => {
  if (value === "") {
    return ["入力してください。"];
  }

  const regex = /^\d+$/;
  if (!regex.test(value)) {
    return ["数値で入力してください。"];
  }

  return [];
};
