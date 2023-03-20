export const convertToRealBR = (amount) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
