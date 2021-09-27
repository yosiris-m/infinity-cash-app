import { useState } from "react";
import styles from "../components/SelectDate.module.scss";

function SelectDate({ initValue, maxValue, onSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(initValue);

  const onChange = (ev) => {
    const selected = ev.target.value;
    setSelectedMonth(selected);
    onSelect(selected);
  };

  return (
    <>
      <input
        className={styles.month}
        type="month"
        onChange={onChange}
        value={selectedMonth}
        max={maxValue}
      />
    </>
  );
}

export default SelectDate;
