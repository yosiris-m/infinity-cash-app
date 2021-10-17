import moment from "moment";
import React, { useState } from "react";
import styles from "./MonthPicker.module.scss";

import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";

function MonthPicker({ initValue, maxValue, onSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(initValue);

  const handleMonthChange = (year, month) => {
    setSelectedMonth({ year, month });
    onSelect(`${year}-${month}`);
    pickMonthRef.current.dismiss();
  };

  const pickerLang = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    from: "From",
    to: "To",
  };

  const pickMonthRef = React.createRef();

  return (
    <>
      <Picker
        ref={pickMonthRef}
        value={selectedMonth}
        onChange={handleMonthChange}
        years={{ max: maxValue }}
        lang={pickerLang}
      >
        <div
          className={styles.monthPicker}
          onClick={() => pickMonthRef.current.show()}
        >
          {moment(
            `${selectedMonth.year}-${selectedMonth.month}`,
            "YYYY-M"
          ).format("MMMM")}
        </div>
      </Picker>
    </>
  );
}

export default MonthPicker;
