import moment from "moment";
import { useEffect, useState } from "react";

import { getExpenses } from "../../services/charts";
import MonthPicker from "./components/MonthPicker";
import Summary from "./components/Summary";
import { Link } from "react-router-dom";
import image from "../../images/cash.svg";

import "moment/locale/es";

import styles from "./Home.module.scss";
import { getTransactions } from "../../services/transactions";
import TransactionList from "./components/TransactionList";
import Loading from "../../components/Loading";

function Home() {
  const now = moment().format("YYYY-MM");
  const year = Number(moment().format("YYYY"));
  const month = Number(moment().format("M"));

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(now);

  const fetchExpenses = async (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    const expenses = await getExpenses({ from, to });
    const data = expenses.map((expense) => ({
      id: expense.label,
      label: expense.label,
      value: expense.total,
    }));
    setChartData(data);
  };

  const fetchTransactions = async (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    console.log("from:", from);
    console.log("to:", to);
    const transactions = await getTransactions({ from, to });
    setTransactions(transactions);
  };

  useEffect(() => {
    setLoading(true);

    if (selectedYearAndMonth) {
      const fetchTransactionsPromise = fetchTransactions(selectedYearAndMonth);
      const fetchExpensesPromise = fetchExpenses(selectedYearAndMonth);

      Promise.all([fetchTransactionsPromise, fetchExpensesPromise])
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error al cargar datos:", err);
          setLoading(false);
        });
    }
  }, [selectedYearAndMonth]);

  const handleMonthSelect = (selectedYearAndMonth) => {
    setSelectedYearAndMonth(selectedYearAndMonth);
  };

  return (
    <>
      <header className={styles.header} id="home">
        <img src={image} className={styles.imgHeader} alt="InfinityCash logo" />
        InfinityCash
      </header>

      <main className={styles.main}>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <div className={styles.transactionSumary}>
              <MonthPicker
                key={selectedYearAndMonth}
                initValue={{ year, month }}
                maxValue={{ year, month }}
                onSelect={handleMonthSelect}
                monthName={moment(selectedYearAndMonth).format("MMMM")}
              />
              {chartData.length === 0 && transactions.length === 0 ? (
                <div className={styles.dataEmpty}>
                  No hay transacciones en este mes, por favor cree una nueva
                  transacción.
                </div>
              ) : (
                <>
                  <Summary
                    transactions={transactions}
                    dataChart={chartData}
                    selectedYearAndMonth={selectedYearAndMonth}
                  />
                  <TransactionList transactions={transactions} />
                </>
              )}
            </div>
          </>
        )}
      </main>

      <footer className={styles.bottomMenu}>
        <Link to="/add-transaction/income" className={styles.newIncome}>
          <i className="fas fa-arrow-down fa-2x" />
          <span>Ingresos</span>
        </Link>
        <Link to="/add-transaction/expense" className={styles.newExpense}>
          <i className="fas fa-arrow-up fa-2x" />
          <span>Gastos</span>
        </Link>
      </footer>
    </>
  );
}

export default Home;
