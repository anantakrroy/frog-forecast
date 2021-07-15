// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DateCalc(time) {
  const date = new Date(time * 1000);
  const fdate = `${date.getDate()} / ${date.getMonth()}`;
  // const day = `${days[date.getDay()]}`;
  return fdate;
}

export default DateCalc;
