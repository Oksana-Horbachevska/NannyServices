export const formatRating = (value: number) =>
  Number.isInteger(value) ? `${value}.0` : value.toString();
