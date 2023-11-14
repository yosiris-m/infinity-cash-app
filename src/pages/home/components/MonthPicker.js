import React, { useState } from "react";
import styles from "./MonthPicker.module.scss";

import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";
import moment from "moment";

function MonthPicker({ initValue, maxValue, onSelect, monthName }) {
  const [selectedMonth, setSelectedMonth] = useState(initValue);
  moment.locale("es");
  const handleMonthChange = (year, month) => {
    setSelectedMonth({ year, month });
    onSelect(`${year}-${month}`);
    pickMonthRef.current.dismiss();
  };

  const pickerLang = {
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    from: "From",
    to: "To",
  };

  const pickMonthRef = React.createRef();

  return (
    <Picker
      ref={pickMonthRef}
      value={selectedMonth}
      onChange={handleMonthChange}
      years={{ max: maxValue }}
      lang={pickerLang.months}
    >
      <div
        className={styles.monthPicker}
        onClick={() => pickMonthRef.current.show(selectedMonth)}
      >
        {monthName}
      </div>
    </Picker>
  );
}

export default MonthPicker;
