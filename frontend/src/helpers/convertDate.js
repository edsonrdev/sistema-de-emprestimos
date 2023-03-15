export const convertDate = (date) => {
  return date.substr(0, 10).split("-").reverse().join("/");
};
