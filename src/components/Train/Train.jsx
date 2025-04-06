import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Train.module.scss";
import { reserveTicket, deleteReserveTicket } from "../../redux/ticketReservationSlice";
import { selectSeat } from "../../redux/seatSlice";
const Seat = ({ id, available, isSelected, onClick }) => {
  const seatStyle = {
    width: 40,
    height: 40,
    backgroundColor: available ? (isSelected ? "#4caf50" : "#ff6347") : "#ff6347",
    border: "1px solid #000",
    margin: "5px",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "40px",
    cursor: available ? "pointer" : "not-allowed",
  };

  return <button onClick={available ? onClick : null} id={id} style={seatStyle}></button>;
};

const Car = ({ type, carIndex, numSeats,
  carsConfig, tripId,
  arrivalStation,
  departureStation }) => {
  const dispatch = useDispatch();
  const seats = [];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const seatsInCol = type === "Giường nằm khoang 6 điều hòa" ? 3 : 2;
  const seatsClusterLength = type === "seat" ? 32 : type === "sleep4" ? 28 : 42;

  const handleSelectSeat = async (seat) => {
    const isSelected = selectedSeat.some(s => s.seatId === seat.seatId);
    if (isSelected) {
      setSelectedSeat(prev => prev.filter(s => s.seatId !== seat.seatId));
      const ticketReservationDTO = {
        seat: seat.seatId,
        trip: tripId,
        departureStation: departureStation,
        arrivalStation: arrivalStation
      }
      await dispatch(deleteReserveTicket(ticketReservationDTO)).then((result) => {
        console.log(result);
      });
      dispatch(selectSeat({ seatId: seat.seatId, ticketPrice: seat.ticketPrice, reservation: null }));
    } else {
      const ticketReservationDTO = {
        seat: seat.seatId,
        trip: tripId,
        departureStation: departureStation,
        arrivalStation: arrivalStation
      }
      const reservationResponse = await dispatch(reserveTicket(ticketReservationDTO));
      const reservation = reservationResponse.payload;
      await dispatch(selectSeat({ seatId: seat.seatId, ticketPrice: seat.ticketPrice, reservation: reservation }));

      setSelectedSeat(prev => [...prev, seat]);

    }
  }

  for (let i = 0; i < numSeats; i++) {
    const seat = carsConfig[i];
    const isSelected = selectedSeat.some(s => s.seatId === seat.seatId);
    seats.push(<Seat key={carsConfig[i].seatId} available={carsConfig[i].available} isSelected={!isSelected} onClick={() => handleSelectSeat(carsConfig[i])} />);
  }

  function renderSeatCluster() {
    const cols = [];
    for (let i = 0; i < seatsClusterLength; i += seatsInCol) {
      cols.push(
        <div className={styles.col} key={i}>
          {Array.from(
            { length: seatsInCol },
            (_, idx) =>
              seats[i + idx] && (
                <div className={styles.seat} key={idx}>
                  {seats[i + idx]}
                </div>
              )
          )}
        </div>
      );
    }
    return cols;
  }

  if (type === "seat") {
    return (
      <div className={styles.car}>
        <div className={styles.carContainer}>{renderSeatCluster()}</div>
        <div className={styles.aisle}></div>
        <div className={styles.carContainer}>{renderSeatCluster()}</div>
      </div>
    );
  } else {
    return (
      <div className={styles.car}>
        <div className={styles.carContainer}>{renderSeatCluster()}</div>
        <div className={styles.aisle}></div>
        {/* {Array.from({ length: 7 }, (_, index) => (
          <React.Fragment key={index}>
            <div className={styles.carContainer}>{renderSeatCluster()}</div>
            <div className={styles.aisle}></div>
          </React.Fragment>
        ))} */}
      </div>
    );
  }
};

// const Cabin = ({ cabinIndex, carsConfig }) => {
//   return (
//     <div className={styles.cabin}>
//       <h2>{`Cabin ${cabinIndex + 1}`}</h2>
//       {carsConfig.map((carConfig, carIndex) => (
//         <Car
//           key={carIndex}
//           type={carConfig.type}
//           numSeats={carConfig.numSeats}
//           carIndex={carIndex}
//         />
//       ))}
//     </div>
//   );
// };

export default function Train({ trainConfig, tripId, arrivalStation, departureStation }) {

  return (
    <div className={styles.train}>
      {trainConfig.map((carConfig, carIndex) => (
        <Car
          key={carIndex}
          carIndex={carIndex}
          type={carConfig.compartmentName}
          numSeats={carConfig.seatCount}
          carsConfig={carConfig.seats}
          tripId={tripId}
          arrivalStation={arrivalStation}
          departureStation={departureStation}
        />
      ))}
    </div>
  );
}
