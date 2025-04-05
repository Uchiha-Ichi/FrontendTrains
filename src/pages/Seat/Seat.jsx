import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarriagesByTrip } from "../../redux/carriageSlice";
import { selectSeat, clearSelectedSeats } from "../../redux/seatSlice";
import styles from "./Seat.module.scss";

export default function SeatSelection() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const location = useLocation();
  const { carriages, loading, error } = useSelector((state) => state.carriage);
  const { selectedSeats } = useSelector((state) => state.seat);

  const { trip, searchData } = location.state || {};

  useEffect(() => {
    if (tripId) {
      // Xóa ghế đã chọn khi chuyển sang chuyến tàu mới
      dispatch(clearSelectedSeats());

      // Lấy danh sách toa và ghế
      dispatch(
        fetchCarriagesByTrip({
          tripId,
          departureStationId: 2, // Giả định Ga B
          arrivalStationId: 3,   // Giả định Ga D
        })
      );
    }
  }, [tripId, dispatch]);

  const handleSelectSeat = (seat) => {
    if (!seat.available) return;
    dispatch(selectSeat(seat.seatId));
  };

  const renderSeats = (carriage) => {
    const { compartmentName, seats } = carriage;
    let seatCount;

    if (compartmentName.includes("Ngồi mềm")) {
      seatCount = 32;
    } else if (compartmentName.includes("Giường nằm khoang 6")) {
      seatCount = 30;
    } else if (compartmentName.includes("Giường nằm khoang 4")) {
      seatCount = 20;
    } else {
      seatCount = seats.length;
    }

    const seatElements = [];
    for (let i = 1; i <= seatCount; i++) {
      const seat = seats.find((s) => parseInt(s.seatNumber.replace(/\D/g, "")) === i) || {
        seatId: `placeholder-${i}`,
        seatNumber: `${i}`,
        available: false,
        seatStatus: "UNAVAILABLE",
      };

      const isSelected = selectedSeats.includes(seat.seatId);
      const seatClass = seat.available
        ? isSelected
          ? styles.seatSelected
          : styles.seatAvailable
        : styles.seatSold;

      seatElements.push(
        <div
          key={seat.seatId}
          className={`${styles.seat} ${seatClass}`}
          onClick={() => handleSelectSeat(seat)}
        >
          {seat.seatNumber}
        </div>
      );
    }

    return seatElements;
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.resultsWrapper}>
          <h2>
            Chuyến tàu {trip?.trainName}: {searchData.from} đến {searchData.to}
          </h2>

          {/* Danh sách toa và ghế */}
          {carriages[tripId] && (
            <div className={styles.carriageSection}>
              <h3>
                Toa của {trip?.trainName}:{" "}
                {carriages[tripId][0]?.compartmentName || "Đang tải..."}
              </h3>
              <div className={styles.carriageList}>
                {carriages[tripId].map((carriage) => (
                  <div key={carriage.carriageListId} className={styles.carriage}>
                    <h4>Khoang {carriage.stt}</h4>
                    <div
                      className={styles.seatLayout}
                      data-type={carriage.compartmentName}
                    >
                      {renderSeats(carriage)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading && <p>Đang tải...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}