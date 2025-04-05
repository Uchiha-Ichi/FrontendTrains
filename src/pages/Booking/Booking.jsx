import { useEffect } from "react";
import styles from "./Booking.module.scss";
import DatePicker from "../../components/DatePicker/DatePicker";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import path from "../../assets/icons/path.svg";
import cart from "../../assets/icons/cart.svg";
// import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import Train from "../../components/Train/Train";

export default function Booking() {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.ticketReservation
  );
  useEffect(() => {

  });
  const [ticketReservation, setTicketReservation] = useState({
    seat: "",
    trip: "",
    arrivalStationId: "",
    departureStationId: "",
    reservationStatus: "OCCUPIED",
  })

  const [activeContainerIndex, setActiveContainerIndex] = useState(null);

  function handleContainerClick(index) {
    // console.log("Clicked container index:", index);
    setActiveContainerIndex(index === activeContainerIndex ? null : index);
  }

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const trainConfig = [
    {
      cars: [{ type: "seat" }, { type: "sleepy4" }],
    },
    {
      cars: [{ type: "sleepy6" }, { type: "seat" }],
    },
  ];


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
        <button>
          1.900.000d
          <img width="24px" height="24px" src={cart} alt="" />
        </button>
      </div>
      {/* <Navigation /> */}
      <div className={styles.mainContent}>
        <div className={styles.train}>
          {[0, 1, 2, 3].map((index) => (
            <Container
              name={"SE01"}
              route={"HN-SG"}
              start={"6h30"}
              avaiableSeat={103}
              key={index}
              isActive={activeContainerIndex === index}
              onClick={() => handleContainerClick(index)}
              // color="blue"
              size={300}
            />
          ))}
        </div>
        <div className={styles.booking}>
          <Train trainConfig={trainConfig} />
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
