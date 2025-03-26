import { useState, useEffect } from "react";
import styles from "./CheckTicket.module.scss";
import Button from "../../components/Button/Button";

const CheckTicket = () => {
  const [checkType, setCheckType] = useState("ticketId");
  const [ticketId, setTicketId] = useState("");
  const [cccd, setCccd] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setTicketId("");
    setCccd("");
    setPhone("");
    setTicketList([]);
    setError("");
  }, [checkType]);

  const handleCheckTicket = async () => {
    setError("");
    setTicketList([]);

    let apiUrl = "";
    if (checkType === "ticketId") {
      if (!ticketId) {
        setError("Vui lòng nhập mã vé!");
        return;
      }
      apiUrl = `http://localhost:8088/api/tickets/${ticketId}`;
    } else {
      if (!cccd || !phone) {
        setError("Vui lòng nhập cả CCCD và số điện thoại!");
        return;
      }
      apiUrl = `http://localhost:8088/api/tickets/user?cccd=${cccd}&phone=${phone}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Không tìm thấy vé!");

      const data = await response.json();
      console.log("Dữ liệu API trả về:", data);

      if (checkType === "ticketId") {
        setTicketList(data ? [data] : []);
      } else {
        if (Array.isArray(data) && data.length > 0) {
          setTicketList(data);
        } else {
          setError("Không tìm thấy vé!");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getTicketStatus = (status) => {
    switch (status) {
      case "1":
        return "Đã đặt";
      case "2":
        return "Đã thanh toán";
      case "3":
        return "Đã sử dụng";
      case "4":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className={styles.container}>
      <h2>Kiểm tra vé</h2>
      <div className={styles.toggleGroup}>
        <button
          className={checkType === "ticketId" ? styles.active : ""}
          onClick={() => setCheckType("ticketId")}
        >
          Kiểm tra bằng mã vé
        </button>
        <button
          className={checkType === "userInfo" ? styles.active : ""}
          onClick={() => setCheckType("userInfo")}
        >
          Kiểm tra bằng thông tin khách hàng
        </button>
      </div>

      <div className={styles.formGroup}>
        {checkType === "ticketId" ? (
          <input
            type="text"
            placeholder="Nhập mã vé"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className={styles.input}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Nhập CCCD"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Nhập Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </>
        )}

        <Button onClick={handleCheckTicket}>Kiểm tra</Button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {ticketList.length > 0 && (
        <div className={styles.ticketInfo}>
          <h3>Danh sách vé</h3>
          {ticketList.map((ticket, index) => (
            <div key={index} className={styles.ticketItem}>
              {checkType === "userInfo" && <h4>Vé {index + 1}</h4>}
              <p><strong>Mã vé:</strong> {ticket.ticketId}</p>
              <p><strong>Hành khách:</strong> {ticket.passenger?.fullname || "Không có dữ liệu"}</p>
              <p><strong>Tên tàu:</strong> {ticket.trip?.train?.trainName || "Không có dữ liệu"}</p>
              <p><strong>Giờ khởi hành:</strong> 
                {ticket.trip?.tripDate 
                  ? `${new Date(ticket.trip.tripDate).toLocaleDateString("vi-VN")} - ${ticket.trip?.train?.departureTime || "Chưa có giờ"}`
                  : "Không có dữ liệu"}
              </p>
              <p>
                <strong>Vị trí ghế:</strong> {ticket.seat?.seatNumber || "?"} 
                {" - Tầng " + (ticket.seat?.level || "?")}
                {" - Toa " + (ticket.seat?.carriageList?.carriageListId || "?")}
                {" - Khoang " + (ticket.seat?.carriageList?.compartment?.compartmentName || "?")}
              </p>
              <p><strong>Giá:</strong> {ticket.totalPrice ? `${ticket.totalPrice} VND` : "Chưa có giá"}</p>
              <p><strong>Ga đi:</strong> {ticket.departureStation?.stationName || "Không có dữ liệu"}</p>
              <p><strong>Ga đến:</strong> {ticket.arrivalStation?.stationName || "Không có dữ liệu"}</p>
              <p><strong>Trạng thái vé:</strong> {getTicketStatus(ticket.ticketStatus)}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckTicket;
