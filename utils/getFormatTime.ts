const getFormatedTime = (timestamp:number) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-US", options);

  return formattedTime;
};

export default getFormatedTime;
