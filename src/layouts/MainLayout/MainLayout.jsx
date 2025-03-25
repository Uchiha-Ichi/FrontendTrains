import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useTheme } from "../../config/ThemeContext";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  const { currentTheme } = useTheme();
  const { greyColor, primaryColor } = currentTheme;
  useEffect(() => {
    document.body.style.backgroundColor = greyColor[1];
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [greyColor]);
  return (
    <div
      className={styles.main}
      style={{
        color: primaryColor[1],
      }}
    >
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
