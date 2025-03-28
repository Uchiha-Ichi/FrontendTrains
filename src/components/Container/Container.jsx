import styles from "./Container.module.scss";
import React, { useState } from "react";
import { useTheme } from "../../config/ThemeContext";
import arrow from "../../assets/icons/arrow.svg";
export default function Container({
  name,
  start,
  avaiableSeat,
  route,
  isActive,
  onClick,
  color,
  size = 100,
}) {
  const { currentTheme } = useTheme();
  const { secondaryColor, greyColor, accentColor, errorColor } = currentTheme;
  color = greyColor[3];
  const squareStyle = {
    backgroundColor: isActive ? secondaryColor[2] : color,
    color: accentColor[1],
    width: isActive ? size * 1.15 : size,
    aspectRatio: 3 / 1,
  };

  return (
    <div className={styles.square} style={squareStyle} onClick={onClick}>
      <div className={styles.squareLabel}>
        <span>{start}</span>
        <div className={styles.duration}>
          <span className={styles.timeAbove}>32h</span>
          <img src={arrow} alt="" />
        </div>
        <span>20h45</span>
      </div>
      <div className={styles.left}>
        <span>{name}</span>
        <span>{route}</span>
      </div>
      <div className={styles.right} style={{ color: errorColor[2] }}>
        <span>{avaiableSeat}</span>
      </div>
    </div>
  );
}
