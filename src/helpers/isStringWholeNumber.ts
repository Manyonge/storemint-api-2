export const isStringWholeNumber = (value: any) => {
  const isNumber = typeof Number(value) === "number" && !isNaN(Number(value));
  const isGreaterThan0 = Number(value) > 0;
  const isWholeNumber = Number.isInteger(value) || Number(value) % 1 === 0;

  return isNumber && isGreaterThan0 && isWholeNumber;
};
