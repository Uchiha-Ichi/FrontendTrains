import { useEffect, useRef } from "react";
import styles from "./Booking.module.scss";
import DatePicker from "../../components/DatePicker/DatePicker";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import path from "../../assets/icons/path.svg";
import cart from "../../assets/icons/cart.svg";
// import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import Train from "../../components/Train/Train";
import { fetchSeat, selectSeat } from "../../redux/seatSlice";
import { setCurrentTrip } from "../../redux/stationSearchSlice";
export default function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trips, loading, error } = useSelector(
    (state) => state.stationSearch
  );
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const totalPrice = useSelector((state) => state.seat.totalPrice);

  const carriages = useSelector((state) => state.seat.carriages);
  const currentTrip = useSelector((state) => state.stationSearch.currentTrip);
  useEffect(() => {
    console.log("🚀 useEffect chạy nè:", trips[0].tripId);
    if (trips.length > 0 && trips[0]?.tripId) {
      dispatch(setCurrentTrip(trips[0]))
      dispatch(fetchSeat({
        tripId: trips[0].tripId,
        from: trips[0].departureStation,
        to: trips[0].arrivalStation
      }));
    }
  }, [trips]);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   if (selectedSeats.length > 0) {
  //     const newTotal = selectedSeats.reduce((acc, seat) => acc + seat.ticketPrice, 0);
  //     setTotal(newTotal);
  //     console.log("selectSeat", selectedSeats);

  //   } else {
  //     setTotal(0); // Nếu không có ghế được chọn, đặt lại tổng tiền về 0
  //   }
  // }, [selectedSeats]);


  // const [ticketReservation, setTicketReservation] = useState({
  //   seat: "",
  //   trip: "",
  //   arrivalStationId: "",
  //   departureStationId: "",
  //   reservationStatus: "OCCUPIED",
  // })
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  const [activeContainerIndex, setActiveContainerIndex] = useState(null);

  function handleContainerClick(index) {
    // console.log("Clicked container index:", index);
    setActiveContainerIndex(index === activeContainerIndex ? null : index);
    dispatch(setCurrentTrip(trips[index]));
    dispatch(fetchSeat(trips[index].tripId, trips[index].departureStation, trips[index].arrivalStation));
  }

  const handleTransfer = () => {
    navigate("/info")
  }

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  function formatTime(dateStr) {
    const date = new Date(dateStr);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  function calculateDuration(departureTime, arrivalTime) {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    // Tính chênh lệch thời gian giữa hai thời điểm (trả về kết quả tính bằng mili giây)
    const diffInMilliseconds = arrivalDate - departureDate;

    // Chuyển đổi mili giây thành giờ
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    return diffInHours;
  }
  if (loading || !currentTrip) return <p>Đang tải dữ liệu...</p>;
  const formatTotalPrice = (totalPrice) => {
    return totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.route}>
          <Input
            colorScheme={"transparent"}
            fontSize={"3rem"}
            id="from"
            defaultValue={"Hà Nội"}
          // width={"min-content"}
          />
          <img src={path} alt="path" />
          <Input
            colorScheme={"transparent"}
            fontSize={"3rem"}
            id="to"
            defaultValue={"Sài Gòn"}
          // width={"100%"}
          />
        </div>{" "}
        <DatePicker value={selectedDate} onChange={handleDateChange} />
        <button onClick={handleTransfer}>
          {formatTotalPrice(totalPrice)}
          <img width="24px" height="24px" src={cart} alt="" />
        </button>
      </div>
      {/* <Navigation /> */}
      <div className={styles.mainContent}>
        <div className={styles.train}>
          {trips && trips.length > 0 ? (
            trips.map((trip, index) => {
              return (
                <Container
                  name={trip.trainName}
                  route={"HN_SGSG"}//calculateDuration(trip.departureTime, trip.arrivalTime)
                  start={"6:00"}//formatTime(trip.departureTime)
                  avaiableSeat={103}
                  key={index}
                  isActive={activeContainerIndex === index}
                  onClick={() => handleContainerClick(index)}
                  // color="blue"
                  size={300}
                />
              );
            }
            )) : (
            <p>Không có chuyến nào</p>
          )
          }
        </div>
        <div className={styles.booking}>
          <Train
            trainConfig={carriages}
            tripId={currentTrip.tripId}
            arrivalStation={currentTrip.arrivalStation}
            departureStation={currentTrip.departureStation} />
        </div>
        {/* <div className={styles.cars}>
          <p>Updating ...</p>
        </div> */}
        {/* <div className={styles.cart}>
          <p>Updating ...</p>
        </div> */}
      </div>
    </>
  );
}
