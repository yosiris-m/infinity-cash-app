import moment from "moment";
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

import { getExpenses } from "../../services/charts";
import MonthPicker from "./components/MonthPicker";
import Summary from "./components/Summary";
import { Link } from "react-router-dom";
import image from "../../images/cash.svg";

import styles from "./Home.module.scss";
import { getTransactions } from "../../services/transactions";
import TransactionList from "./components/TransactionList";

function Home() {
  const now = moment().format("YYYY-MM");
  const year = Number(moment().format("YYYY"));
  const month = Number(moment().format("M"));

  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(now);

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

  const fetchTransactions = (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    getTransactions({ from, to }).then((transactions) => {
      setTransactions(transactions);
    });
  };

  useEffect(() => {
    fetchTransactions(selectedYearAndMonth);
    fetchExpenses(selectedYearAndMonth);
  }, [selectedYearAndMonth]);

  return (
    <div>
      <div className={styles.header} id="home">
        <img src={image} className={styles.imgHeader} />
        FamilyCash
      </div>
      <MonthPicker
        initValue={{ year, month }}
        maxValue={{ year, month }}
        onSelect={(yearAndMonth) => setSelectedYearAndMonth(yearAndMonth)}
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
          cornerRadius={2}
          activeInnerRadiusOffset={22}
          activeOuterRadiusOffset={8}
          borderWidth={10}
          borderColor={{ theme: "background" }}
          enableArcLinkLabels={true}
          arcLinkLabelsDiagonalLength={7}
          arcLinkLabelsStraightLength={8}
          arcLinkLabelsTextOffset={3}
          arcLinkLabelsThickness={2}
          arcLinkLabelsSkipAngle={4}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="black"
          theme={{
            labels: {
              text: {
                fontSize: 9,
                fontWeight: " bold ",
                fontFamily: "Montserrat",
              },
            },
          }}
        />
      </div>

      <Summary transactions={transactions} />
      <TransactionList transactions={transactions} />

      <div className={styles.bottomMenu}>
        <Link to="/add-transaction/income" className={styles.newTransaction}>
          Income
        </Link>
        <Link to="/add-transaction/expense" className={styles.newExpense}>
          Expense
        </Link>
        <Link to="/add-category" className={styles.newTransaction}>
          Category
        </Link>
      </div>
    </div>
  );
}

export default Home;
