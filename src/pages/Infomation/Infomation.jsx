import styles from "./Information.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
export default function Infomation() {
  return (
    <>
      <Navigation />
      <form action="">
        <h2>Thông tin người đặt vé</h2>
        <Input label={"Họ và tên"} id={"name"} />
        <Input label={"Số điện thoại"} id={"phone"} />
        <Input label={"CCCD/ Hộ chiếu"} id={"id-passport"} />
        <Input label={"Email"} id={"mail"} />
      </form>
      <form action="">
        <div className={styles.gridContent}>
          <div className={styles.gridHeader}>Thông tin</div>
          <div className={styles.gridHeader}>Chỗ ngồi</div>
          <div className={styles.gridHeader}>Tàu</div>
          <div className={styles.gridHeader}>Giá vé</div>
          <div className={styles.gridHeader}>Giảm giá</div>
          <div className={styles.gridHeader}>Thành tiền</div>

          <div className={styles.gridCell}>
            <Input label={"Họ và tên"} id={"name"} />
            <label>Đối tượng:</label>
            <select name="" id="">
              <option value="">Trẻ em</option>
              <option value="">Sinh viên</option>
              <option value="">Người lớn</option>
            </select>
            <Input label={"Giấy tờ"} id={"name"} />
          </div>
          <div className={styles.gridCell}>Toa 2, ghế 12F, nằm khoang 4</div>
          <div className={styles.gridCell}>SE01 HN - SG, 6h10</div>
          <div className={styles.gridCell}>1.400.000</div>
          <div className={styles.gridCell}>0</div>
          <div className={styles.gridCell}>1.400.000</div>
        </div>
        <Button>Thanh toán</Button>
      </form>
    </>
  );
}
