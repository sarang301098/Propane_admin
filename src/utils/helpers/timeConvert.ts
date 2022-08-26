import moment from "moment";

// convert to 12
export const convertTo12 = (time: string) => {
  const convertedTime = moment(time, ["HH:mm:ss"]).format("hh:mm A"); //time "10:20:00"
  return convertedTime;
};
// convert to 24
export const convertTo24 = (time: string) => {
  const convertedTime = moment(time, ["h:mm A"]).format("HH:mm"); // time "10:20 AM"
  return convertedTime;
};
