export const validateNameHiragana = (value: string) => {
  if (value === "") {
    return ["入力してください。"];
  }

  const regex = /^[ぁ-ん]+$/;
  if (!regex.test(value)) {
    return ["ひらがなで入力してください。"];
  }

  return [];
};
