import Dinero from "dinero.js";
import "../components/totalTransaction.css";
// import ProgressBar from "react-bootstrap/ProgressBar";

function TotalTransaction({ transactions }) {
  let income = 0;
  let expenses = 0;

  for (const transaction of transactions) {
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }
  }

  const absExpenses = Math.abs(expenses);
  const total = income + absExpenses;

  return (
    <div>
      <div className="totalAmount1">
        Income:
        <p>
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}

          <progress
            className="barIncome"
            max={total}
            value={income}
            alt="ARIA"
          ></progress>
        </p>
        {/* <ProgressBar now={income} /> */}
      </div>
      <div className="totalAmount2">
        Expenses:
        <p className="expenses">
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}

          <progress
            className="barExpenses"
            id="barExpenses"
            max={total}
            value={absExpenses}
            alt="ARIA"
          ></progress>
        </p>
      </div>
    </div>
  );
}

export default TotalTransaction;
