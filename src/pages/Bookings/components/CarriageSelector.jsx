import React, { useState } from 'react';
import SeatMap from '../components/SeatMap';
import styles from  './CarriageSelector.module.scss'; //'../Booking.module.scss'

const CarriageSelector = ({ danhSachToa, onChonGhe, danhSachGheDaChon }) => {
  const [toaHienTai, setToaHienTai] = useState(0);

  return (
    <div className={styles.carriageSelector}>
      <div className={styles.tabsToa}>
        {danhSachToa.map((toa, index) => (
          <button
            key={toa.maToa}
            className={index === toaHienTai ? styles.active : ''}
            onClick={() => setToaHienTai(index)}
          >
            {toa.tenToa}
          </button>
        ))}
      </div>
      
      <div className={styles.noiDungToa}>
        <SeatMap 
          danhSachGhe={danhSachToa[toaHienTai].danhSachGhe} 
          loaiToa={danhSachToa[toaHienTai].tenToa}
          onChonGhe={onChonGhe}
          danhSachGheDaChon={danhSachGheDaChon}
        />
      </div>
    </div>
  );
};

export default CarriageSelector;