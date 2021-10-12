import Dinero from "dinero.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

import { getExpenses } from "../../services/charts";
import SelectDate from "../transactions/components/SelectDate";
import styles from "./Reports.module.scss";

function Reports() {
  const now = moment().format("YYYY-MM");
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchExpenses = (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    getExpenses({ from, to }).then((expenses) => {
      const data = expenses.map((expense) => ({
        id: expense.label,
        label: expense.label,
        value: expense.total,
      }));
      setChartData(data);
      setExpenses(expenses);
    });
  };

  const handleSelectDate = (month) => {
    fetchExpenses(month);
  };

  useEffect(() => {
    fetchExpenses(now);
  }, [now]);

  console.log("expenses ->", expenses);
  return (
    <>
      <div className="allTime">Expenses by categories</div>
      <SelectDate initValue={now} maxValue={now} onSelect={handleSelectDate} />

      <div className={styles.chart}>
        <ResponsivePie
          colors={{ scheme: "orange_red" }}
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          valueFormat={(value) =>
            Dinero({ amount: value, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat()
          }
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}

export default Reports;
