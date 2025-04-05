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


// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function Calendar({ onDateChange }) {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     // Chuyển đổi ngày thành định dạng YYYY-MM-DD
//     const formattedDate = date
//       ? date.toLocaleDateString("en-CA", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//         })
//       : "";
//     onDateChange(formattedDate); // Gọi prop onDateChange với ngày đã định dạng
//   };

//   return (
//     <div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         dateFormat="yyyy-MM-dd"
//         placeholderText="Chọn ngày"
//       />
//     </div>
//   );
// }