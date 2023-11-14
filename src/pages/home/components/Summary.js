import Chart from "./Chart";
import styles from "./Summary.module.scss";
import Dinero from "dinero.js";

function Summary({ transactions, dataChart, selectedYearAndMonth }) {
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

  const balance = income - expenses;
  const chartData = { income, expenses, balance };

  return (
    <>
      <Chart data={chartData} selectedYearAndMonth={selectedYearAndMonth} />
      <div className={styles.wrapper}>
        <div className={styles.boxIncome}>
          <span>Ingresos</span>
          <span>
            {Dinero({ amount: income, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat()}
          </span>
        </div>
        <div className={styles.boxExpense}>
          <span>Gastos</span>
          <span>
            {Dinero({ amount: expenses, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat()}
          </span>
        </div>

        <div className={styles.boxBalance}>
          <span>Disponibles</span>
          <span>
            {Dinero({ amount: balance, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat()}
          </span>
        </div>
      </div>
    </>
  );
}

export default Summary;
