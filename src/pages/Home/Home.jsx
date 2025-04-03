  // import styles from "./Home.module.scss";
  // import React from "react";
  // import ReactDOM from "react-dom";
  // import Calendar from "../../components/Calendar/Calendar";
  // import Input from "../../components/Input/Input";
  // import Button from "../../components/Button/Button";

  // export default function Home() {
  //   return (
  //     <div className={styles.main}>
  //       <Calendar />
  //       <div className={styles.mainRight}>
  //         <Input colorScheme={"primary"} label={"Ga đi?"} id={"from"} />
  //         <Input colorScheme={"primary"} label={"Ga đến?"} id={"to"} />
  //         <Button>Tìm kiếm</Button>
  //       </div>
  //     </div>
  //   );
  // }


  // import styles from "./Home.module.scss";
  // import React, { useState } from "react";
  // import { useDispatch, useSelector } from "react-redux";
  // import { searchTrains } from "../../redux/stationSearchSlice";
  // import { fetchStationSuggestions, clearSuggestions } from "../../redux/stationAutoCompleteSlice";
  // import Calendar from "../../components/Calendar/Calendar";
  // import Input from "../../components/Input/Input";
  // import Button from "../../components/Button/Button";

  // export default function Home() {
  //     const dispatch = useDispatch();
  //     const { suggestions } = useSelector((state) => state.stationAutoComplete);
  //     console.log("🚀 Danh sách gợi ý:", suggestions);
  //     const { results, loading, error } = useSelector((state) => state.stationSearch);

  //     const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });

  //     const handleInputChange = (e) => {
  //         const { id, value } = e.target;
  //         setSearchData((prev) => ({ ...prev, [id]: value }));

  //         if (value.length > 1) {
  //             dispatch(fetchStationSuggestions(value)); // Gọi API gợi ý ga
  //         } else {
  //             dispatch(clearSuggestions());
  //         }
  //     };

  //     const handleSelectStation = (station, field) => {
  //         setSearchData((prev) => ({ ...prev, [field]: station }));
  //         dispatch(clearSuggestions());
  //     };

  //     const handleSearch = () => {
  //         if (!searchData.from || !searchData.to || !searchData.date) {
  //             alert("Vui lòng nhập đầy đủ thông tin!");
  //             return;
  //         }
  //         dispatch(searchTrains(searchData));
  //     };

  //     return (
  //         <div className={styles.main}>
  //             <Calendar onDateChange={(date) => setSearchData({ ...searchData, date })} />
  //             <div className={styles.mainRight}>
  //                 <div className={styles.inputWrapper}>
  //                     <Input
  //                         colorScheme="primary"
  //                         label="Ga đi?"
  //                         id="from"
  //                         value={searchData.from}
  //                         onChange={handleInputChange}
  //                     />
  //                     {suggestions.length > 0 && (
  //                         <ul className={styles.suggestions}>
  //                             {suggestions.map((station) => (
  //                                 <li key={station.id} onClick={() => handleSelectStation(station.name, "from")}>
  //                                     {station.name}
  //                                 </li>
  //                             ))}
  //                         </ul>
  //                     )}
  //                 </div>

  //                 <div className={styles.inputWrapper}>
  //                     <Input
  //                         colorScheme="primary"
  //                         label="Ga đến?"
  //                         id="to"
  //                         value={searchData.to}
  //                         onChange={handleInputChange}
  //                     />
  //                     {suggestions.length > 0 && (
  //                         <ul className={styles.suggestions}>
  //                             {suggestions.map((station) => (
  //                                 <li key={station.id} onClick={() => handleSelectStation(station.name, "to")}>
  //                                     {station.name}
  //                                 </li>
  //                             ))}
  //                         </ul>
  //                     )}
  //                 </div>

  //                 <Button onClick={handleSearch}>Tìm kiếm</Button>
  //             </div>

  //             {/* Kết quả tìm kiếm */}
  //             <div className={styles.results}>
  //                 {loading && <p>Đang tìm kiếm...</p>}
  //                 {error && <p className={styles.error}>Lỗi: {error}</p>}
  //                 {results.length > 0 && (
  //                     <ul>
  //                         {results.map((train) => (
  //                             <li key={train.id}>
  //                                 <p><strong>Tàu:</strong> {train.trainCode}</p>
  //                                 <p><strong>Khởi hành:</strong> {train.departureTime}</p>
  //                                 <p><strong>Đến nơi:</strong> {train.arrivalTime}</p>
  //                             </li>
  //                         ))}
  //                     </ul>
  //                 )}
  //             </div>
  //         </div>
  //     );
  // }



  // import styles from "./Home.module.scss";
  // import React, { useState } from "react";
  // import { useDispatch, useSelector } from "react-redux";
  // import { searchTrains } from "../../redux/stationSearchSlice";
  // import {
  //   fetchStationSuggestions,
  //   clearSuggestions,
  //   setActiveField,
  // } from "../../redux/stationAutoCompleteSlice";
  // import { debounce } from "lodash";
  // import Calendar from "../../components/Calendar/Calendar";
  // import Input from "../../components/Input/Input";
  // import Button from "../../components/Button/Button";
  // import { toast, ToastContainer } from "react-toastify";
  // import "react-toastify/dist/ReactToastify.css";
  
  // export default function Home() {
  //   const dispatch = useDispatch();
  //   const { suggestions, loading: suggestionsLoading, activeField } = useSelector(
  //     (state) => state.stationAutoComplete
  //   );
  //   const { results, loading, error } = useSelector((state) => state.stationSearch);
  
  //   const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });
  
  //   const debouncedFetchSuggestions = debounce((value) => {
  //     dispatch(fetchStationSuggestions(value));
  //   }, 300);
  
  //   const handleInputChange = (e) => {
  //     const { id, value } = e.target;
  //     setSearchData((prev) => ({ ...prev, [id]: value }));
  //     dispatch(setActiveField(id));
  
  //     if (value.length > 1) {
  //       debouncedFetchSuggestions(value);
  //     } else {
  //       dispatch(clearSuggestions());
  //     }
  //   };
  
  //   const handleSelectStation = (station, field) => {
  //     setSearchData((prev) => ({ ...prev, [field]: station }));
  //     dispatch(clearSuggestions());
  //   };
  
  //   const handleSearch = () => {
  //     if (!searchData.from || !searchData.to || !searchData.date) {
  //       toast.error("Vui lòng nhập đầy đủ thông tin!");
  //       return;
  //     }
  //     dispatch(searchTrains(searchData));
  //   };
  
  //   return (
  //     <div className={styles.main}>
  //       {/* Thêm ToastContainer ở đây */}
  //       <ToastContainer
  //         position="top-right" // Vị trí thông báo
  //         autoClose={3000}   // Tự động đóng sau 3 giây
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //       />
  //       <Calendar onDateChange={(date) => setSearchData({ ...searchData, date })} />
  //       <div className={styles.mainRight}>
  //         <div className={styles.inputWrapper}>
  //           <Input
  //             colorScheme="primary"
  //             label="Ga đi?"
  //             id="from"
  //             value={searchData.from}
  //             onChange={handleInputChange}
  //           />
  //           {suggestionsLoading && activeField === "from" && <p>Đang tải gợi ý...</p>}
  //           {suggestions.length > 0 && activeField === "from" && !suggestionsLoading && (
  //             <ul className={styles.suggestions}>
  //               {suggestions.map((station) => (
  //                 <li key={station.id} onClick={() => handleSelectStation(station.name, "from")}>
  //                   {station.name}
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </div>
  
  //         <div className={styles.inputWrapper}>
  //           <Input
  //             colorScheme="primary"
  //             label="Ga đến?"
  //             id="to"
  //             value={searchData.to}
  //             onChange={handleInputChange}
  //           />
  //           {suggestionsLoading && activeField === "to" && <p>Đang tải gợi ý...</p>}
  //           {suggestions.length > 0 && activeField === "to" && !suggestionsLoading && (
  //             <ul className={styles.suggestions}>
  //               {suggestions.map((station) => (
  //                 <li key={station.id} onClick={() => handleSelectStation(station.name, "to")}>
  //                   {station.name}
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </div>
  
  //         <Button onClick={handleSearch}>Tìm kiếm</Button>
  //       </div>
  
  //       <div className={styles.results}>
  //         {loading && <p>Đang tìm kiếm...</p>}
  //         {error && <p className={styles.error}>Lỗi: {error}</p>}
  //         {results.length > 0 && (
  //           <ul>
  //             {results.map((train) => (
  //               <li key={train.id}>
  //                 <p><strong>Tàu:</strong> {train.trainCode}</p>
  //                 <p><strong>Khởi hành:</strong> {train.departureTime}</p>
  //                 <p><strong>Đến nơi:</strong> {train.arrivalTime}</p>
  //               </li>
  //             ))}
  //           </ul>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }











//   import styles from "./Home.module.scss";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchTrains } from "../../redux/stationSearchSlice";
// import {
//   fetchStationSuggestions,
//   clearSuggestions,
//   setActiveField,
// } from "../../redux/stationAutoCompleteSlice";
// import { debounce } from "lodash";
// import Calendar from "../../components/Calendar/Calendar";
// import Input from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Home() {
//   const dispatch = useDispatch();
//   const { suggestions, loading: suggestionsLoading, activeField } = useSelector(
//     (state) => state.stationAutoComplete
//   );
//   console.log("🚀 Danh sách gợi ý:", suggestions);
//   const { results, loading, error } = useSelector((state) => state.stationSearch);

//   const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });

//   const debouncedFetchSuggestions = debounce((value) => {
//     dispatch(fetchStationSuggestions(value));
//   }, 300);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setSearchData((prev) => ({ ...prev, [id]: value }));
//     dispatch(setActiveField(id)); // Gọi action setActiveField

//     if (value.length > 1) {
//       debouncedFetchSuggestions(value);
//     } else {
//       dispatch(clearSuggestions());
//     }
//   };

//   const handleSelectStation = (station, field) => {
//     setSearchData((prev) => ({ ...prev, [field]: station }));
//     dispatch(clearSuggestions());
//   };

//   const handleSearch = () => {
//     if (!searchData.from || !searchData.to || !searchData.date) {
//       toast.error("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }
//     dispatch(searchTrains(searchData));
//   };

//   return (
//     <div className={styles.main}>
//       <ToastContainer />
//       <Calendar onDateChange={(date) => setSearchData({ ...searchData, date })} />
//       <div className={styles.mainRight}>
//         <div className={styles.inputWrapper}>
//           <Input
//             colorScheme="primary"
//             label="Ga đi?"
//             id="from"
//             value={searchData.from}
//             onChange={handleInputChange}
//           />
//           {suggestionsLoading && activeField === "from" && <p>Đang tải gợi ý...</p>}
//           {suggestions.length > 0 && activeField === "from" && !suggestionsLoading && (
//             <ul className={styles.suggestions}>
//               {suggestions.map((station) => (
//                 <li key={station.id} onClick={() => handleSelectStation(station.name, "from")}>
//                   {station.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className={styles.inputWrapper}>
//           <Input
//             colorScheme="primary"
//             label="Ga đến?"
//             id="to"
//             value={searchData.to}
//             onChange={handleInputChange}
//           />
//           {suggestionsLoading && activeField === "to" && <p>Đang tải gợi ý...</p>}
//           {suggestions.length > 0 && activeField === "to" && !suggestionsLoading && (
//             <ul className={styles.suggestions}>
//               {suggestions.map((station) => (
//                 <li key={station.id} onClick={() => handleSelectStation(station.name, "to")}>
//                   {station.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <Button onClick={handleSearch}>Tìm kiếm</Button>
//       </div>

//       <div className={styles.results}>
//         {loading && <p>Đang tìm kiếm...</p>}
//         {error && <p className={styles.error}>Lỗi: {error}</p>}
//         {results.length > 0 && (
//           <ul>
//             {results.map((train) => (
//               <li key={train.id}>
//                 <p><strong>Tàu:</strong> {train.trainCode}</p>
//                 <p><strong>Khởi hành:</strong> {train.departureTime}</p>
//                 <p><strong>Đến nơi:</strong> {train.arrivalTime}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



import styles from "./Home.module.scss";
import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTrains } from "../../redux/stationSearchSlice";
import {
  fetchStationSuggestions,
  fetchAllStations,
  clearSuggestions,
  setActiveField,
} from "../../redux/stationAutoCompleteSlice";
import { debounce } from "lodash";
import Calendar from "../../components/Calendar/Calendar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { suggestions, allStations, loading: suggestionsLoading, activeField } = useSelector(
    (state) => state.stationAutoComplete
  );
  const { results, loading, error } = useSelector((state) => state.stationSearch);

  const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });
  const [errors, setErrors] = useState({ from: "", to: "", date: "" }); // Thêm trạng thái lỗi

    // Gọi API lấy toàn bộ danh sách ga khi component được mount
  useEffect(() => {
    dispatch(fetchAllStations());
  }, [dispatch]);

  const debouncedFetchSuggestions = debounce((value) => {
    dispatch(fetchStationSuggestions(value));
  }, 300);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchData((prev) => ({ ...prev, [id]: value }));
    dispatch(setActiveField(id)); // Đặt activeField
    // Xóa lỗi khi người dùng bắt đầu nhập lại
    setErrors((prev) => ({ ...prev, [id]: "" }));

    console.log("Active field:", id); // Debug: Kiểm tra activeField
    console.log("Input value:", value); // Debug: Kiểm tra giá trị nhập

    if (value.length > 1) {
      debouncedFetchSuggestions(value);
    } else {
      dispatch(clearSuggestions());
    }
  };

  const handleSelectStation = (station, field) => {
    setSearchData((prev) => ({ ...prev, [field]: station.stationName }));
    dispatch(clearSuggestions());
    dispatch(setActiveField(null)); // Đặt lại activeField sau khi chọn
    // Xóa lỗi khi người dùng chọn ga từ danh sách gợi ý
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSearch = () => {
    let newErrors = { from: "", to: "", date: "" };
    let hasError = false;

    // Kiểm tra tính hợp lệ của ga trước
    if (searchData.from) {
      const isFromValid = allStations.some(
        (station) => station.stationName.toLowerCase() === searchData.from.toLowerCase()
      );
      if (!isFromValid) {
        newErrors.from = "Ga không hợp lệ";
        hasError = true;
      }
    }

    if (searchData.to) {
      const isToValid = allStations.some(
        (station) => station.stationName.toLowerCase() === searchData.to.toLowerCase()
      );
      if (!isToValid) {
        newErrors.to = "Ga không hợp lệ";
        hasError = true;
      }
    }

    // Kiểm tra các trường trống
    if (!searchData.from) {
      newErrors.from = "Vui lòng nhập ga đi";
      hasError = true;
    }
    if (!searchData.to) {
      newErrors.to = "Vui lòng nhập ga đến";
      hasError = true;
    }
    if (!searchData.date) {
      newErrors.date = "Vui lòng chọn ngày";
      hasError = true;
    }

    // Cập nhật trạng thái lỗi
    setErrors(newErrors);

    // Nếu có lỗi, không tiếp tục tìm kiếm
    if (hasError) {
      return;
    }

    // Nếu không có lỗi, tiến hành tìm kiếm
    dispatch(searchTrains(searchData));
  };

  // Debug: Kiểm tra điều kiện hiển thị
  console.log("Suggestions:", suggestions);
  console.log("Active field (state):", activeField);
  console.log("Suggestions length:", suggestions.length);
  console.log("Should show suggestions for 'from':", suggestions.length > 0 && activeField === "from");
  console.log("Should show suggestions for 'to':", suggestions.length > 0 && activeField === "to");


  return (
    <div className={styles.main}>
      <ToastContainer />
      <div className={styles.container}>
        {/* Lịch bên trái */}
        <div className={styles.calendarWrapper}>
          <p className={styles.dateLabel}>
            Ngày khởi hành: {searchData.date || "Chưa chọn"}
          </p>
          {errors.date && <p className={styles.error}>{errors.date}</p>}
          <Calendar
            onDateChange={(date) => {
              setSearchData({ ...searchData, date });
              setErrors((prev) => ({ ...prev, date: "" })); // Xóa lỗi ngày khi chọn
            }}
          />
        </div>

        {/* Ô nhập liệu bên phải */}
        <div className={styles.mainRight}>
          <div className={styles.inputWrapper}>
            <Input
              colorScheme="primary"
              label="Ga đi?"
              id="from"
              value={searchData.from}
              onChange={handleInputChange}
              placeholder="Nhập ga đi"
            />
            {errors.from && <p className={styles.error}>{errors.from}</p>}
            {suggestionsLoading && activeField === "from" && (
              <p className={styles.loading}>Đang tải gợi ý...</p>
            )}
            {suggestions.length > 0 && activeField === "from" && !suggestionsLoading && (
              <ul className={styles.suggestions}>
                {suggestions.map((station) => (
                  <li
                    key={station.stationId}
                    onClick={() => handleSelectStation(station, "from")}
                    className={styles.suggestionItem}
                  >
                    {station.stationName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              colorScheme="primary"
              label="Ga đến?"
              id="to"
              value={searchData.to}
              onChange={handleInputChange}
              placeholder="Nhập ga đến"
            />
            {errors.to && <p className={styles.error}>{errors.to}</p>}
            {suggestionsLoading && activeField === "to" && (
              <p className={styles.loading}>Đang tải gợi ý...</p>
            )}
            {suggestions.length > 0 && activeField === "to" && !suggestionsLoading && (
              <ul className={styles.suggestions}>
                {suggestions.map((station) => (
                  <li
                    key={station.stationId}
                    onClick={() => handleSelectStation(station, "to")}
                    className={styles.suggestionItem}
                  >
                    {station.stationName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button onClick={handleSearch}>Tìm kiếm</Button>
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      <div className={styles.results}>
        {loading && <p>Đang tìm kiếm...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((train) => (
              <li key={train.id}>
                <p>
                  <strong>Tàu:</strong> {train.trainCode}
                </p>
                <p>
                  <strong>Khởi hành:</strong> {train.departureTime}
                </p>
                <p>
                  <strong>Đến nơi:</strong> {train.arrivalTime}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
