import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Navigation.module.scss"; // Your SCSS file

export default function Navigation() {
  return (
    <div className={styles.lineContainer}>
      <div className={styles.line}></div>
      <div className={styles.circles}>
        <Link to="/tickets" className={styles.circle}></Link>
        <Link to="/info" className={styles.circle}></Link>
        <Link to="/confirm" className={styles.circle}></Link>
        <Link to="/checkout" className={styles.circle}></Link>
      </div>
    </div>
  );
}
