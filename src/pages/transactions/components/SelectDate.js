import { useState } from "react";
import "../components/SelectDate.css";

function SelectDate({ initValue, maxValue, onSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(initValue);

  const onChange = (ev) => {
    const selected = ev.target.value;
    setSelectedMonth(selected);
    onSelect(selected);
  };

  return (
    <>
      <main>
        <input
          className="month"
          type="month"
          onChange={onChange}
          value={selectedMonth}
          max={maxValue}
        />
      </main>
    </>
  );
}

export default SelectDate;
