import moment from "moment";
import styles from "./Calendar.module.scss";
import "rc-calendar/assets/index.css";
import RcCalendar from "rc-calendar";
import { useState } from "react";
export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.format("YYYY-MM-DD"));
  };

  return (
    <div className={styles.calendar}>
      <h2>{selectedDate.format("MM-YYYY")}</h2>
      <p>Ngày khởi hành: {selectedDate.format("DD-MM-YYYY")}</p>

      <RcCalendar onChange={handleDateChange} className={styles.rcCalendar} />
      {/* <RcCalendar /> */}
    </div>
  );
}
