import { Link } from "react-router-dom";
import styles from "../components/Button.module.scss";

function Button({ label, type = "button", to = "", onClick = () => {} }) {
  const btn = (
    <button type={type} className={styles.btn} onClick={onClick}>
      {label}
    </button>
  );

  if (to === "") {
    return btn;
  } else {
    return <Link to={to}>{btn}</Link>;
  }
}

export default Button;
