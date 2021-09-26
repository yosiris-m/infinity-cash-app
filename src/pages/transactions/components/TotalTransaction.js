import Dinero from "dinero.js";
import { ProgressBar } from "react-bootstrap";
import "../components/TotalTransaction.css";

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
    <main className="totalAmount">
      <div className="totalAmount1">
        Income:
        <div>
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}

          {/* <progress
            className="barIncome"
            max={total}
            value={income}
            alt="ARIA"
          ></progress> */}
          <ProgressBar variant="success" max={total} now={income} />
        </div>
      </div>
      <div className="totalAmount2">
        Expenses:
        <div className="expenses">
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}

          {/* <progress
            className="barExpenses"
            id="barExpenses"
            max={total}
            value={expenses}
            alt="ARIA"
          ></progress> */}
          <ProgressBar variant="danger" max={total} now={expenses} />
        </div>
      </div>
    </main>
  );
}

export default TotalTransaction;
