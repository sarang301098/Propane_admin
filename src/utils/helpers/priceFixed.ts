export const fixPrice = (price: number | string | undefined) => {
  let num;
  if (typeof price === "number") {
    num = price.toFixed(2);
  }
  if (price) {
    num = Number(price).toFixed(2);
  }
  return num;
};
