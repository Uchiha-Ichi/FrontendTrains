import styles from "./Input.module.scss";
import { useTheme } from "../../config/ThemeContext";
export default function Input({ label, id, value, onChange }) {
  const { currentTheme } = useTheme();
  const { accentColor, greyColor } = currentTheme;
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        style={{
          color: accentColor[2],
          backgroundColor: greyColor[2],
        }}
        id={id}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
