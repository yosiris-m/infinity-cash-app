import moment from "moment";
import { useEffect, useState } from "react";
import { getTransactions } from "../../../services/transactions";
import styles from "./TransactionList.module.scss";
import TransactionItem from "./TransactionItem";
import Dinero from "../../../../node_modules/dinero.js/build/esm/dinero";

function TransactionList() {
  const now = moment().format("YYYY-MM");
  const [transactions, setTransactions] = useState([]);
  let income = 0;
  let expenses = 0;

  for (const transaction of transactions) {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }
  }

  const total = income - expenses;

  const fetchTransactions = (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    getTransactions({ from, to }).then((transactions) => {
      setTransactions(transactions);
    });
  };

  useEffect(() => {
    fetchTransactions(now);
  }, [now]);

  console.log("transactions ->", transactions);
  const transactionsByDate = {};
  for (const transaction of transactions) {
    if (!transactionsByDate[transaction.date]) {
      transactionsByDate[transaction.date] = [];
    }
    transactionsByDate[transaction.date].push(transaction);
  }

  return (
    <>
      <div className={styles.amount}>
        <div className={styles.boxIncome}>
          <span>Income: </span>
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </div>
        <div className={styles.balance}>
          <span>Balance: </span>
          {Dinero({ amount: total, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </div>
        <div className={styles.boxExpense}>
          <span>Expense: </span>
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </div>
      </div>
      <div className={styles.wrapper}>
        {Object.keys(transactionsByDate).map((date, idx) => (
          <TransactionItem
            key={idx}
            date={date}
            transactions={transactionsByDate[date]}
          />
        ))}
      </div>
    </>
  );
}

export default TransactionList;
