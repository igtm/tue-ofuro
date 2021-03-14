export const validateBdayDay = (value: string) => {
  if (value === "") {
    return ["入力してください。"];
  }

  const regex = /^(?:[1-9]|[1,2][0-9]|3[0,1])$/;
  if (!regex.test(value)) {
    return ["1から31の数値で入力してください。"];
  }

  return [];
};
