import React from 'react';
import styles from  './TripList.module.scss'; //'../Booking.module.scss'

const TripList = ({ danhSachChuyen, onChonChuyen }) => {
  return (
    <div className={styles.danhSachChuyen}>
      <table>
        <thead>
          <tr>
            <th>Số hiệu</th>
            <th>Giờ đi</th>
            <th>Giờ đến</th>
            <th>SL chỗ trống</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {danhSachChuyen.map(chuyen => (
            <tr key={chuyen.maChuyen}>
              <td>{chuyen.soHieuTau}</td>
              <td>{chuyen.gioDi}</td>
              <td>{chuyen.gioDen}</td>
              <td>
                {chuyen.danhSachToa.reduce((tong, toa) => 
                  tong + toa.danhSachGhe.filter(ghe => ghe.trangThai === "TRONG").length, 0)}
              </td>
              <td>
                <button onClick={() => onChonChuyen(chuyen)}>Chọn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripList;