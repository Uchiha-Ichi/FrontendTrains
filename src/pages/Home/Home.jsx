
import styles from "./Home.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTrains } from "../../redux/stationSearchSlice";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
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
import { featchTicketType } from "../../redux/ticketType";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Thêm navigate
  const { suggestions, allStations, loading: suggestionsLoading, activeField } = useSelector(
    (state) => state.stationAutoComplete
  );
  const { results, loading, error } = useSelector((state) => state.stationSearch);

  const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });
  const [errors, setErrors] = useState({ from: "", to: "", date: "" }); // Thêm trạng thái lỗi
  // Gọi API lấy toàn bộ danh sách ga khi component được mount
  useEffect(() => {
    dispatch(fetchAllStations());
    dispatch(featchTicketType());
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
    dispatch(searchTrains(searchData)).then(() => {
      // Chuyển hướng đến trang TripList và truyền dữ liệu tìm kiếm
      navigate("/booking");
    });
  };

  // Debug: Kiểm tra điều kiện hiển thị


  return (
    <div className={styles.main}>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <h2>Thông tin hành trình</h2>
          <div className={styles.searchForm}>
            <div className={styles.inputWrapper}>
              <Input
                colorScheme="primary"
                label="Ga đi"
                id="from"
                value={searchData.from}
                onChange={handleInputChange}
                placeholder="Nhập ga đi"
              />
              {errors.from && <p className={styles.error}>{errors.from}</p>}
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
                label="Ga đến"
                id="to"
                value={searchData.to}
                onChange={handleInputChange}
                placeholder="Nhập ga đến"
              />
              {errors.to && <p className={styles.error}>{errors.to}</p>}
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

            <div className={styles.calendarWrapper}>
              <p className={styles.dateLabel}>Ngày đi: {searchData.date || "Chưa chọn"}</p>
              {errors.date && <p className={styles.error}>{errors.date}</p>}
              <Calendar
                onDateChange={(date) => {
                  setSearchData((prev) => ({ ...prev, date }));
                  setErrors((prev) => ({ ...prev, date: "" }));
                }}
              />
            </div>

            <Button onClick={handleSearch}>Tìm kiếm</Button>
          </div>
        </div>

        {loading && <p>Đang tìm kiếm...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}