import React from "react";
import styles from "./Train.module.scss";

const Seat = ({ type, isOccupied }) => {
  const seatStyle = {
    width: 40,
    height: 40,
    backgroundColor: isOccupied ? "#ff6347" : "#4caf50",
    border: "1px solid #000",
    margin: "5px",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "40px",
  };

  return <button style={seatStyle}></button>;
};

const Car = ({ type, carIndex }) => {
  const seats = [];
  const seatsInCol = type === "sleepy6" ? 3 : 2;
  const seatsClusterLength = type === "seat" ? 32 : type === "sleep4" ? 28 : 42;
  const seatType =
    type === "seat" ? "Seat" : type === "sleepy4" ? "Sleepy4" : "Sleepy6";
  const numSeats = type === "seat" ? 64 : type === "sleepy4" ? 28 : 42;

  for (let i = 0; i < numSeats; i++) {
    seats.push(<Seat key={i} type={seatType} isOccupied={false} />);
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

const Cabin = ({ cabinIndex, carsConfig }) => {
  return (
    <div className={styles.cabin}>
      <h2>{`Cabin ${cabinIndex + 1}`}</h2>
      {carsConfig.map((carConfig, carIndex) => (
        <Car
          key={carIndex}
          type={carConfig.type}
          numSeats={carConfig.numSeats}
          carIndex={carIndex}
        />
      ))}
    </div>
  );
};

export default function Train({ trainConfig }) {
  return (
    <div className={styles.train}>
      {trainConfig.map((cabinConfig, cabinIndex) => (
        <Cabin
          key={cabinIndex}
          cabinIndex={cabinIndex}
          carsConfig={cabinConfig.cars}
        />
      ))}
    </div>
  );
}
