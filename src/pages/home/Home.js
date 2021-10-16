import Dinero from "../../../node_modules/dinero.js/build/esm/dinero";
import moment from "moment";
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

import { getExpenses } from "../../services/charts";
import MonthPicker from "./components/MonthPicker";
import TransactionList from "./components/TransactionList";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

function Home() {
  const now = moment().format("YYYY-MM");
  const year = Number(moment().format("YYYY"));
  const month = Number(moment().format("M"));
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
    });
  };

  const handleSelectDate = (month) => {
    fetchExpenses(month);
  };

  useEffect(() => {
    fetchExpenses(now);
  }, [now]);

  return (
    <>
      <div className={styles.header} id="home">
        FamilyCash
      </div>
      <MonthPicker
        initValue={{ year, month }}
        maxValue={{ year, month }}
        onSelect={handleSelectDate}
      />
      <div className={styles.chart}>
        <ResponsivePie
          data={chartData}
          colors={{ scheme: "paired" }}
          margin={{ left: 50, right: 50 }}
          innerRadius={0.3}
          padAngle={0.7}
          startAngle={-70}
          endAngle={296}
          cornerRadius={3}
          activeInnerRadiusOffset={22}
          activeOuterRadiusOffset={8}
          borderWidth={19}
          borderColor={{ theme: "background" }}
          valueFormat={(value) =>
            Dinero({ amount: value, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat()
          }
          enableArcLinkLabels={true}
          arcLinkLabelsDiagonalLength={7}
          arcLinkLabelsStraightLength={10}
          arcLinkLabelsTextOffset={3}
          arcLinkLabelsThickness={2}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="black"
          theme={{
            labels: {
              text: { fontSize: 10 },
            },
          }}
        />
      </div>

      <TransactionList />

      <div className={styles.bottomMenu}>
        <Link to="/add-transaction/income">
          <div className={styles.NewIncome}>
            <i className="fas fa-plus" />
            Income
          </div>
        </Link>
        <Link to="/add-transaction/expense">
          <div className={styles.NewExpense}>
            <i className="fas fa-plus" />
            Expense
          </div>
        </Link>
        <Link to="/add-category">
          <div className={styles.NewCategory}>
            <i className="fas fa-plus" />
            Category
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
