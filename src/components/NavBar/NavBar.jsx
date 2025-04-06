import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTheme } from "../../config/ThemeContext";
import styles from "./NavBar.module.scss";
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/icons/logo.jpg";
import searchIcon from "../../assets/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import deleteReserveTicket from "../../redux/ticketReservationSlice";
import leo from "../../assets/icons/leo.svg";
import { clearSelectedSeats } from "../../redux/seatSlice";

export default function NavBar() {
  const { themes, switchTheme, currentTheme } = useTheme();
  const { greyColor } = currentTheme;
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const handleClearSelectedSeats = async () => {
    const promises = selectedSeats.map((seat) => {
      const ticketReservationDTO = {
        seat: seat.seatId,
        trip: seat.reservation.tripId,
        departureStation: seat.reservation.departureStation,
        arrivalStation: seat.reservation.arrivalStation
      };

      return dispatch(deleteReserveTicket(ticketReservationDTO)).then.then((result) => {
        console.log('Action completed successfully:', result);
      })
        .catch((error) => {
          console.error('Error during deletion:', error);
        });
    });

    // Chờ tất cả xong mới xóa hết selected seats
    await Promise.all(promises);
    dispatch(clearSelectedSeats());
    navigate("/");
  }
  function handleSearch(e) {
    e.preventDefault();
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link to="/" onClick={() => handleClearSelectedSeats()}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.searchSection}>
        <Link to="/" iconSrc={"../assets/icons/home.svg"} onClick={() => handleClearSelectedSeats} />
        <div
          className={styles.searchBar}
          style={{ backgroundColor: greyColor[3] }}
        >
          <form onSubmit={handleSearch} className={styles.searchForm}>
            {/* <button className={styles.btnCircle} type="submit"></button>  */}
            <input
              type="text"
              placeholder="Find your orders, tickets?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className={styles.right}>
        {/* <img src={leo} alt="" /> */}
        <label>Theme:</label>
        <select
          onChange={(e) => switchTheme(e.target.value)}
          defaultValue="HibernusTheme"
        >
          {Object.keys(themes).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}{" "}
              {/* Capitalize the theme name */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
