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
import Loading from "../../components/Loading";

function Home() {
  const now = moment().format("YYYY-MM");
  const year = Number(moment().format("YYYY"));
  const month = Number(moment().format("M"));

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(now);

  const fetchExpenses = (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    return getExpenses({ from, to }).then((expenses) => {
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

    return getTransactions({ from, to }).then((transactions) => {
      setTransactions(transactions);
    });
  };

  useEffect(() => {
    setLoading(true);

    const fetchTransactionsPromise = fetchTransactions(selectedYearAndMonth);
    const fetchExpensesPromise = fetchExpenses(selectedYearAndMonth);

    Promise.all([fetchTransactionsPromise, fetchExpensesPromise])
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedYearAndMonth]);

  return (
    <>
      <header className={styles.header} id="home">
        <img src={image} className={styles.imgHeader} alt="FamilyCash logo" />
        FamilyCash
      </header>

      <main className={styles.main}>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <div>
              <MonthPicker
                initValue={{ year, month }}
                maxValue={{ year, month }}
                onSelect={(yearAndMonth) =>
                  setSelectedYearAndMonth(yearAndMonth)
                }
              />
              <Summary transactions={transactions} />
              <Chart data={chartData} />
            </div>
            <TransactionList transactions={transactions} />
          </>
        )}
      </main>

      <footer className={styles.bottomMenu}>
        <Link to="/add-transaction/income" className={styles.newIncome}>
          <i className="fas fa-arrow-down fa-2x" />
          <span>Income</span>
        </Link>
        <Link to="/add-transaction/expense" className={styles.newExpense}>
          <i className="fas fa-arrow-up fa-2x" />
          <span>Expense</span>
        </Link>
      </footer>
    </>
  );
}

export default Home;
