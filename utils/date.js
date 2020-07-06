export const getNextMonday = () => {
  const today = new Date();
  today.setDate(today.getDate() + ((7 - today.getDay()) % 7) + 1);
  return `Monday ${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })}`;
};

export const getNiceFormatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
