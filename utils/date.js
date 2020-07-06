export const getNextMonday = () => {
  const today = new Date();
  today.setDate(today.getDate() + ((7 - today.getDay()) % 7) + 1);
  return `Monday ${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })}`;
};
