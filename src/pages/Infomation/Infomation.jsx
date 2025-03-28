import React, { useState } from "react";
import axios from "axios";
import styles from "./Information.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTicketReservation } from "../../redux/ticketReservationSlice";
import { featchTicketType } from "../../redux/ticketType";
import { bookTickets } from "../../redux/ticketSlice";

// import { bookTickets, testTicket } from "../../redux/ticketSlice";
export default function Infomation() {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.ticketReservation
  );
  useEffect(() => {
    dispatch(fetchTicketReservation(3));
    dispatch(fetchTicketReservation(6));
    dispatch(featchTicketType());
  }, [dispatch]);
  const ticketType = useSelector((state) => state.ticketType.types);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    cccd: "",
    email: "",
  });
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    if (reservations?.length > 0) {
      setTickets(
        reservations.map((reservation) => ({
          fullName: "",
          cccd: "",
          price: 1000000,
          discount: 0,
          totalPrice: 1000000,
          ticketReservation: reservation,
          ticketType: ticketType[1],
        }))
      );
    }
  }, [reservations]);


  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  const handlePay = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        customerDTO: customerInfo,
        ticketInformationDTO: tickets,
      };

      const totalAmount = getTotalAmount() || 0;;
      let requestData = { customer: customerInfo.fullName, amount: totalAmount };

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
      updatedTickets[index] = { ...updatedTickets[index], ticketType: ticketType[idType] };
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
          {reservations.map((reservation, index) => (
            console.log(ticketType),

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

                  {ticketType.map((type, idx) => (
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
                {reservation.seat.carriageList.compartment.compartmentName}, ghế {reservation.seat.seatName}
              </div>
              <div className={styles.gridCell}>
                {reservation.trip.train.trainName}, {reservation.trip.train.route.routeName}, {reservation.trip.tripDate}
              </div>
              <div className={styles.gridCell} >1.000.000</div>
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
