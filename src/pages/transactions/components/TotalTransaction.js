import Dinero from "dinero.js";
import { ProgressBar } from "react-bootstrap";
import styles from "../components/TotalTransaction.Module.scss";

function TotalTransaction({ transactions }) {
  let income = 0;
  let expenses = 0;

  for (const transaction of transactions) {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }
  }

  const total = income + expenses;

  return (
    <main className={styles.container}>
      <div className={styles.totalAmount}>
        <div className={styles.boxIncome}>
          <span>Ingresos: </span>
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}
        </div>
        <div className={styles.barBoxIncome}>
          <ProgressBar
            variant="success"
            max={total}
            now={income}
            className={styles.barIncome}
          />{" "}
        </div>
      </div>

      <div className={styles.totalExpense}>
        <div className={styles.boxExpense}>
          <span>Gastos: </span>
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("es-ES")
            .toFormat()}{" "}
        </div>

        <div className={styles.barBoxExpense}>
          <ProgressBar
            variant="danger"
            max={total}
            now={expenses}
            className={styles.barExpense}
          />
        </div>
      </div>
    </main>
  );
}

export default TotalTransaction;
