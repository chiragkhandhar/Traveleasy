exports.getDates = (currentDate) => {
  let dates = [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  currentDate.setDate(currentDate.getDate() - 7);

  for (let i = 0; i < 7; i++) {
    dates[i] = `${currentDate.getFullYear()}-${
      months[currentDate.getMonth()]
    }-${currentDate.getDate()}`;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

exports.getData = () => {
  let data = [];

  let limit = Math.floor(Math.random() * 1000);

  for (let i = 0; i < 7; i++) data.push(Math.floor(Math.random() * limit));

  return data;
};
