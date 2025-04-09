import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckTicket.module.scss";
import Button from "../../components/Button/Button";
import { searchTicketById, searchTicketsByCustomer } from "../../redux/checkTicketSlice";

const CheckTicket = () => {
    const [checkType, setCheckType] = useState("ticketId");
    const [ticketId, setTicketId] = useState("");
    const [cccd, setCccd] = useState("");
    const [phone, setPhone] = useState("");
    const [ticketList, setTicketList] = useState([]);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const { tickets, loading, error: reduxError } = useSelector((state) => state.checkTicket);

    useEffect(() => {
        setTicketId("");
        setCccd("");
        setPhone("");
        setTicketList([]);
        setError("");
    }, [checkType]);

    useEffect(() => {
        if (tickets) {
            if (Array.isArray(tickets)) setTicketList(tickets);
            else setTicketList([tickets]);
        }
    }, [tickets]);

    useEffect(() => {
        if (reduxError) {
            setError(typeof reduxError === "string" ? reduxError : "Có lỗi xảy ra");
        }
    }, [reduxError]);

    const handleCheckTicket = () => {
        setError("");
        setTicketList([]);

        if (checkType === "ticketId") {
            if (!ticketId) {
                setError("Vui lòng nhập mã vé!");
                return;
            }
            dispatch(searchTicketById(ticketId));
        } else {
            if (!cccd || !phone) {
                setError("Vui lòng nhập cả CCCD và số điện thoại!");
                return;
            }
            dispatch(searchTicketsByCustomer({ cccd, phone }));
        }
    };
    const findDepartureTime = (trip, departureStation) => {
        if (!trip || !trip.train || !trip.train.trainSchedules || !departureStation) return null;
    
        const schedule = trip.train.trainSchedules.find(
            (s) => s.station?.stationId === departureStation.stationId
        );
    
        // Tạm dùng arrivalTime thay cho departureTime nếu bị ghi ngược
        return schedule?.arrivalTime || null;
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
                <Button onClick={handleCheckTicket} disabled={loading}>
                    {loading ? "Đang kiểm tra..." : "Kiểm tra"}
                </Button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {ticketList.length > 0 && (
                <div className={styles.ticketInfo}>
                    <h3>Danh sách vé</h3>
                    {ticketList.map((ticket, index) => {
                        const res = ticket.reservation;
                        const trip = res?.trip;
                        const seat = res?.seat;
                        const carriage = seat?.carriageList;
                        const compartment = carriage?.compartment;

                        return (
                            <div key={index} className={styles.ticketItem}>
                                {checkType === "userInfo" && <h4>Vé {index + 1}</h4>}
                                <p><strong>Mã vé:</strong> {ticket.ticketId}</p>
                                <p><strong>Hành khách:</strong> {ticket.passenger?.fullname || "Không có dữ liệu"}</p>
                                <p><strong>Tên tàu:</strong> {trip?.train?.trainName || "Không có dữ liệu"}</p>
                                <p><strong>Giờ khởi hành:</strong>
  {trip?.tripDate
    ? `${new Date(trip.tripDate).toLocaleDateString("vi-VN")} - ${
        findDepartureTime(trip, res?.departureStation) || "Chưa có giờ"
      }`
    : "Không có dữ liệu"}
</p>

                                <p>
                                    <strong>Vị trí ghế:</strong> {seat?.seatNumber || "?"}
                                    {" - Tầng " + (seat?.floor || "?")}
                                    {" - Toa " + (carriage?.carriageListId || "?")}
                                    {" - Khoang " + (compartment?.compartmentName || "?")}
                                </p>
                                <p><strong>Giá:</strong> {ticket.totalPrice ? `${ticket.totalPrice} VND` : "Chưa có giá"}</p>
                                <p><strong>Ga đi:</strong> {res?.departureStation?.stationName || "Không có dữ liệu"}</p>
                                <p><strong>Ga đến:</strong> {res?.arrivalStation?.stationName || "Không có dữ liệu"}</p>
                                <p><strong>Trạng thái vé:</strong> {ticket.ticketStatus || "Không có dữ liệu"}</p>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CheckTicket;
