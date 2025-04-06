import moment from "moment";
import styles from "./Calendar.module.scss";
import "rc-calendar/assets/index.css";
import RcCalendar from "rc-calendar";
import { useState } from "react";
export default function Calendar({ onDateChange }) { // Nhận prop onDateChange
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.format("YYYY-MM-DD"); // Định dạng ngày thành YYYY-MM-DD
    console.log("Selected date:", formattedDate);
    onDateChange(formattedDate); // Gọi onDateChange để truyền ngày lên Home.jsx
  };

  return (
    <div className={styles.calendar}>
      <h2>{selectedDate.format("MM-YYYY")}</h2>
      <p>Ngày khởi hành: {selectedDate.format("DD-MM-YYYY")}</p>
      <RcCalendar onChange={handleDateChange} className={styles.rcCalendar} />
    </div>
  );
}


