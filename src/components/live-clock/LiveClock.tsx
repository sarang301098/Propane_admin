import moment from "moment";
import { useEffect, useState } from "react";

export const LiveClock = () => {
  const [clock, setTime] = useState(
    moment(new Date()).format("DD/MM/YYYY hh:mm A")
  );

  useEffect(() => {
    const liveClock = setInterval(() => {
      setTime(moment(new Date()).format("DD/MM/YYYY hh:mm A"));
    }, 1000);
    return () => {
      clearInterval(liveClock);
    };
  }, []);

  return <span>{clock} </span>;
};
