import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTheme } from "../../config/ThemeContext";
import styles from "./NavBar.module.scss";
import logo from "../../assets/icons/logo.jpg";
import searchIcon from "../../assets/icons/search.svg";
import leo from "../../assets/icons/leo.svg";

export default function NavBar() {
  const { themes, switchTheme, currentTheme } = useTheme();
  const { greyColor } = currentTheme;
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    e.preventDefault();
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.searchSection}>
        <Link to={"/"} iconSrc={"../assets/icons/home.svg"} />
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
