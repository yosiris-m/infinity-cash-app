import moment from "moment";
import { useEffect, useState } from "react";

import { getExpenses } from "../../services/charts";
import MonthPicker from "./components/MonthPicker";
import Summary from "./components/Summary";
import { Link } from "react-router-dom";
import image from "../../images/cash.svg";

import styles from "./Home.module.scss";
import { getTransactions } from "../../services/transactions";
import TransactionList from "./components/TransactionList";
import Chart from "./components/Chart";

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
    <>
      <header className={styles.header} id="home">
        <img src={image} className={styles.imgHeader} alt="FamilyCash logo" />
        FamilyCash
      </header>

      <main className={styles.main}>
        <div>
          <MonthPicker
            initValue={{ year, month }}
            maxValue={{ year, month }}
            onSelect={(yearAndMonth) => setSelectedYearAndMonth(yearAndMonth)}
          />
          <Summary transactions={transactions} />
          <Chart data={chartData} />
        </div>
        <TransactionList transactions={transactions} />
      </main>

      <footer className={styles.bottomMenu}>
        <Link to="/add-transaction/income" className={styles.newTransaction}>
          Income
        </Link>
        <Link to="/add-transaction/expense" className={styles.newExpense}>
          Expense
        </Link>
        <Link to="/add-category" className={styles.newTransaction}>
          Category
        </Link>
      </footer>
    </>
  );
}

export default Home;
