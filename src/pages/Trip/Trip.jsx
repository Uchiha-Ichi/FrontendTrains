import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarriagesByTrip } from "../../redux/carriageSlice";
import styles from "./Trip.module.scss";
import Button from "../../components/Button/Button";

export default function Trip() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Lấy dữ liệu tìm kiếm từ location.state (nếu cần hiển thị tiêu đề)
  const { searchData } = location.state || { searchData: { from: "", to: "", date: "" } };

  // Lấy danh sách chuyến tàu từ Redux store (stationSearchSlice)
  const { results } = useSelector((state) => state.stationSearch);

  // Lấy danh sách toa và ghế từ Redux store (carriageSlice)
  const { carriages } = useSelector((state) => state.carriage);

  // Gọi API để lấy danh sách ghế cho từng chuyến tàu
  useEffect(() => {
    results.forEach((trip) => {
      dispatch(
        fetchCarriagesByTrip({
          tripId: trip.tripId,
          departureStationId: 2, // Giả định Ga B
          arrivalStationId: 3,   // Giả định Ga D
        })
      );
    });
  }, [results, dispatch]);

  const handleSelectTrip = (trip) => {
    navigate(`/trips/${trip.tripId}/seats`, { state: { trip, searchData } });
  };

  // Tính số lượng ghế trống cho một chuyến tàu
  const getAvailableSeatsCount = (tripId) => {
    if (!carriages[tripId]) return "N/A";
    return carriages[tripId].reduce((total, carriage) => {
      return total + carriage.seats.filter((seat) => seat.available).length;
    }, 0);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.resultsWrapper}>
          <h2>
            Chiều đi: ngày {searchData.date} từ {searchData.from} đến {searchData.to}
          </h2>

          {/* Danh sách chuyến tàu dưới dạng bảng */}
          <table className={styles.tripTable}>
            <thead>
              <tr>
                <th>Số hiệu</th>
                <th>Giờ đi</th>
                <th>Giờ đến</th>
                <th>SL chỗ trống</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((trip) => (
                <tr key={trip.tripId}>
                  <td>{trip.trainName}</td>
                  <td>
                    {new Date(trip.departureTime).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {new Date(trip.arrivalTime).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{getAvailableSeatsCount(trip.tripId)}</td>
                  <td>
                    <Button onClick={() => handleSelectTrip(trip)}>Chọn</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}