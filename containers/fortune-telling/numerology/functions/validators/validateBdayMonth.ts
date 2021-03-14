export const validateBdayMonth = (value: string) => {
  if (value === "") {
    return ["入力してください。"];
  }

  const regex = /^(?:[1-9]|1[0-2])$/;
  if (!regex.test(value)) {
    return ["1から12の数値で入力してください。"];
  }

  return [];
};
