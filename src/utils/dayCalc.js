const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DayCalc(time) {
  const date = new Date(time * 1000);
  const day = `${days[date.getDay()]}`;
  return day;
}

export default DayCalc;
