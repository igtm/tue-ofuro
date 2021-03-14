export const validateNameRome = (value: string) => {
  if (value === "") {
    return ["入力してください。"];
  }

  const regex = /^[a-z]+$/;
  if (!regex.test(value)) {
    return ["アルファベットで入力してください。"];
  }

  return [];
};
