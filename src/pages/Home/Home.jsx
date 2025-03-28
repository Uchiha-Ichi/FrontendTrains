import styles from "./Home.module.scss";
import React from "react";
import ReactDOM from "react-dom";
import Calendar from "../../components/Calendar/Calendar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function Home() {
  return (
    <div className={styles.main}>
      <Calendar />
      <div className={styles.mainRight}>
        <Input colorScheme={"primary"} label={"Ga đi?"} id={"from"} />
        <Input colorScheme={"primary"} label={"Ga đến?"} id={"to"} />
        <Button>Tìm kiếm</Button>
      </div>
    </div>
  );
}
