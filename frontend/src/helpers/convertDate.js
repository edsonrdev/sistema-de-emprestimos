export const convertDate = (date) => {
  const newDate = new Date(date);

  const d =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const m =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const y = newDate.getFullYear();

  return `${d}/${m}/${y}`;
};
