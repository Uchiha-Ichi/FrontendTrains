import React, { useState } from 'react';
import styles from './Booking.module.scss';
import TripList from '../Bookings/components/TripList/';
import CarriageSelector from '../Bookings/components/CarriageSelector';

const Booking = () => {
  // Dữ liệu mẫu - trong thực tế sẽ lấy từ API
  const [danhSachChuyen, setDanhSachChuyen] = useState([
    {
      maChuyen: 1,
      soHieuTau: "SE8",
      gioDi: "15/04 06:00",
      gioDen: "16/04 19:12",
      danhSachToa: [
        {
          maToa: 1,
          stt: 1,
          tenToa: "Ngồi mềm điều hòa",
          heSo: 1.00,
          tongGhe: 32,
          danhSachGhe: [
            { maGhe: 1, soGhe: "A1", tang: 1, heSoGhe: 1.00, trangThai: "TRONG", khaDung: true, giaVe: 1000000 },
            { maGhe: 2, soGhe: "A2", tang: 1, heSoGhe: 1.00, trangThai: "TRONG", khaDung: true, giaVe: 1000000 },
            // Thêm các ghế khác...
          ]
        },
        // Thêm các toa khác...
      ]
    },
    // Thêm các chuyến khác...
  ]);

  const [chuyenDaChon, setChuyenDaChon] = useState(null);
  const [danhSachGheDaChon, setDanhSachGheDaChon] = useState([]);

  const handleChonChuyen = (chuyen) => {
    setChuyenDaChon(chuyen);
  };

  const handleChonGhe = (ghe) => {
    if (ghe.khaDung) {
      if (danhSachGheDaChon.some(g => g.maGhe === ghe.maGhe)) {
        setDanhSachGheDaChon(danhSachGheDaChon.filter(g => g.maGhe !== ghe.maGhe));
      } else {
        setDanhSachGheDaChon([...danhSachGheDaChon, ghe]);
      }
    }
  };

  return (
    <div className={styles.bookingContainer}>
      <h1>Đặt Vé Tàu Hỏa</h1>
      {!chuyenDaChon ? (
        <TripList 
          danhSachChuyen={danhSachChuyen} 
          onChonChuyen={handleChonChuyen} 
        />
      ) : (
        <div className={styles.chiTietChuyen}>
          <button onClick={() => setChuyenDaChon(null)}>Quay Lại</button>
          <h2>Chuyến tàu: {chuyenDaChon.soHieuTau}</h2>
          <p>Khởi hành: {chuyenDaChon.gioDi} - Đến: {chuyenDaChon.gioDen}</p>
          
          <CarriageSelector 
            danhSachToa={chuyenDaChon.danhSachToa} 
            onChonGhe={handleChonGhe}
            danhSachGheDaChon={danhSachGheDaChon}
          />
          
          {danhSachGheDaChon.length > 0 && (
            <div className={styles.danhSachGheDaChon}>
              <h3>Ghế đã chọn:</h3>
              <ul>
                {danhSachGheDaChon.map(ghe => (
                  <li key={ghe.maGhe}>
                    {ghe.soGhe} - {ghe.giaVe.toLocaleString()} VND
                  </li>
                ))}
              </ul>
              <button>Thanh Toán</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;