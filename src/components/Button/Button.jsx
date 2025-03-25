import React from "react";
import { useTheme } from "../../config/ThemeContext";
import styles from "./Button.module.scss";

export default function Button({ children }) {
  const { currentTheme } = useTheme();
  const { accentColor, lightColor } = currentTheme;
  // console.log("Light Color:", currentTheme.lightColor);

  return (
    <button
      style={{
        backgroundColor: accentColor[2],
        color: lightColor,
      }}
      className={styles.button}
    >
      {children}
    </button>
  );
}
