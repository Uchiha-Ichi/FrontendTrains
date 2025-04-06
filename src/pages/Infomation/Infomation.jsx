import React, { useState } from "react";
import axios from "axios";
import styles from "./Information.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { fetchTicketReservation } from "../../redux/ticketReservationSlice";
import { featchTicketType } from "../../redux/ticketType";

// import { bookTickets, testTicket } from "../../redux/ticketSlice";
export default function Infomation() {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);

  const { types, loading, error } = useSelector((state) => state.ticketType);
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    cccd: "",
    email: "",
  });
  const [tickets, setTickets] = useState([]);


  // const getPrice = (reservation) => {
  //   let price = 0;
  //   price = reservation.seat * reservation.seat.car
  //   return
  // }
  useEffect(() => {
    console.log("here");
    if (selectedSeats?.length > 0) {
      setTickets(
        selectedSeats.map((selectedSeat) => ({
          fullName: "",
          cccd: "",
          price: selectedSeat.ticketPrice,
          discount: 0,
          totalPrice: selectedSeat.ticketPrice,
          ticketReservation: selectedSeat.reservation,
          ticketType: types[1],
        }))
      );
    }
  }, []);


  const handlePay = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        customerDTO: customerInfo,
        ticketInformationDTO: tickets,
      };

      const totalAmount = getTotalAmount() || 0;;
      let requestData = { customer: customerInfo.fullName, amount: totalAmount / 1000 };
      console.log("reqData", requestData);
      const response = await axios.post("http://localhost:5000/payment", requestData,
        { headers: { "Content-Type": "application/json" } });

      if (response.data && response.data.resultCode === 0) {
        localStorage.setItem("payload", JSON.stringify(payload));

        window.location.href = response.data.payUrl;

      } else {
        console.error("Thanh toán thất bại:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
    }
  };

  const handlePrice = (category, index) => {
    let newPrice = 1000000; // Giá mặc định
    let newDiscount = 0;
    let idType = 0;
    if (category === "Trẻ em") {
      idType = 1;
      newDiscount = 0.5;
      newPrice = 500000;
    } else if (category === "Sinh viên") {
      idType = 3;
      newDiscount = 0.1
      newPrice = 900000;
    } else if (category === "Người cao tuổi") {
      idType = 2;
      newDiscount = 0.3
      newPrice = 700000;
    }

    // Cập nhật giá cho vé tương ứng
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index] = { ...updatedTickets[index], totalPrice: newPrice };
      updatedTickets[index] = { ...updatedTickets[index], discount: newDiscount };
      updatedTickets[index] = { ...updatedTickets[index], ticketType: types[idType] };
      return updatedTickets;
    });
  };

  const getTotalAmount = () => {
    return tickets.reduce((sum, ticket) => sum + (ticket?.totalPrice || 0), 0);
  };
  return (
    <>
      <Navigation />
      <form onSubmit={handlePay}>
        <h2>Thông tin người đặt vé</h2>
        <Input label={"Họ và tên"} id={"name"} value={customerInfo?.fullName || ""}
          onChange={(e) => {
            console.log("Trước khi cập nhật:", customerInfo);
            setCustomerInfo((prev) => {
              const newState = { ...prev, fullName: e.target.value };
              console.log("Sau khi cập nhật:", newState);
              return newState;
            });
          }} />
        <Input label={"Số điện thoại"} id={"phone"} value={customerInfo?.phone || ""}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
        <Input label={"CCCD/ Hộ chiếu"} id={"id-passport"} value={customerInfo?.cccd || ""}
          onChange={(e) => setCustomerInfo({ ...customerInfo, cccd: e.target.value })} />
        <Input label={"Email"} id={"mail"} value={customerInfo?.email || ""}
          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })} />
        <div className={styles.gridContent}>
          <div className={styles.gridHeader}>Thông tin</div>
          <div className={styles.gridHeader}>Chỗ ngồi</div>
          <div className={styles.gridHeader}>Tàu</div>
          <div className={styles.gridHeader}>Giá vé</div>
          <div className={styles.gridHeader}>Giảm giá</div>
          <div className={styles.gridHeader}>Thành tiền</div>
          {selectedSeats.map((selectedSeat, index) => (
            console.log(types),

            <React.Fragment key={index}>
              <div className={styles.gridCell}>
                <Input label={"Họ và tên"} id={`name-${index}`} value={tickets[index]?.fullName || ""}
                  onChange={(e) => {
                    const newTickets = [...tickets];
                    newTickets[index].fullName = e.target.value;
                    setTickets(newTickets);
                  }} />
                <label>Đối tượng:</label>
                <select name={`category-${index}`} id={`category-${index}`} onChange={(event) => handlePrice(event.target.value, index)}>

                  {types.map((type, idx) => (
                    <option key={idx} value={type.ticketTypeName}>
                      {type.ticketTypeName}
                    </option>
                  ))}
                </select>
                <Input label={"Giấy tờ"} id={`id-${index}`} value={tickets[index]?.cccd || ""}
                  onChange={(e) => {
                    const newTickets = [...tickets];
                    newTickets[index].cccd = e.target.value;
                    setTickets(newTickets);
                  }} />
              </div>
              <div className={styles.gridCell}>
                {selectedSeat.reservation.seat.carriageList.compartment.compartmentName}, ghế {selectedSeat.reservation.seat.seatName}
              </div>
              <div className={styles.gridCell}>
                {selectedSeat.reservation.trip.train.trainName}, {selectedSeat.reservation.trip.train.route.routeName}, {selectedSeat.reservation.trip.tripDate}
              </div>
              <div className={styles.gridCell}>{selectedSeat.ticketPrice.toLocaleString()} VND</div>
              <div className={styles.gridCell}>Giảm {(tickets[index]?.discount * 100).toString()} %</div>
              <div className={styles.gridCell}>Giá: {tickets[index]?.totalPrice.toLocaleString()} VND</div>
            </React.Fragment>
          ))}

        </div>
        <Button type="submit">Thanh toán</Button>
      </form>
    </>
  );
}
