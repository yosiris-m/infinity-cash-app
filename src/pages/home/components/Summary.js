import styles from "./Summary.module.scss";
import Dinero from "dinero.js";

function Summary({ transactions }) {
  if (transactions.length === 0) {
    return null;
  }

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.boxIncome}>
        <span>Income</span>
        <span>
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </span>
      </div>
      <div className={styles.boxBalance}>
        <span>Balance</span>{" "}
        <span>
          {Dinero({ amount: total, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </span>
      </div>
      <div className={styles.boxExpense}>
        <span>Expense</span>
        <span>
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </span>
      </div>
    </div>
  );
}

export default Summary;
