import { useState } from "react";

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
        type="month"
        onChange={onChange}
        value={selectedMonth}
        max={maxValue}
      />
    </>
  );
}

export default SelectDate;
