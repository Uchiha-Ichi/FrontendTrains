import React from 'react';
import styles from  './SeatMap.module.scss'; //'../Booking.module.scss'

const SeatMap = ({ danhSachGhe, loaiToa, onChonGhe, danhSachGheDaChon }) => {
  const layMauGhe = (ghe) => {
    if (!ghe.khaDung) return 'do';
    if (danhSachGheDaChon.some(g => g.maGhe === ghe.maGhe)) return 'vang';
    return 'trang';
  };

  const renderGhe = () => {
    if (loaiToa.includes("Ngồi mềm")) {
      return (
        <div className={styles.layoutGheMem}>
          {danhSachGhe.map(ghe => (
            <div 
              key={ghe.maGhe}
              className={`${styles.ghe} ${styles[layMauGhe(ghe)]}`}
              onClick={() => onChonGhe(ghe)}
            >
              {ghe.soGhe}
            </div>
          ))}
        </div>
      );
    } else if (loaiToa.includes("khoang 6")) {
      return (
        <div className={styles.layoutKhoang6}>
          {danhSachGhe.map(ghe => (
            <div 
              key={ghe.maGhe}
              className={`${styles.giuong} ${styles[layMauGhe(ghe)]}`}
              onClick={() => onChonGhe(ghe)}
            >
              {ghe.soGhe}
            </div>
          ))}
        </div>
      );
    } else if (loaiToa.includes("khoang 4")) {
      return (
        <div className={styles.layoutKhoang4}>
          {danhSachGhe.map(ghe => (
            <div 
              key={ghe.maGhe}
              className={`${styles.giuong} ${styles[layMauGhe(ghe)]}`}
              onClick={() => onChonGhe(ghe)}
            >
              {ghe.soGhe}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={styles.seatMap}>
      <h3>{loaiToa}</h3>
      {renderGhe()}
    </div>
  );
};

export default SeatMap;