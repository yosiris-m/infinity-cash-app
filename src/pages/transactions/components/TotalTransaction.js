import Dinero from "dinero.js";
import "../components/totalTransaction.css";

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

  return (
    <>
      <div className="totalAmount1">
        Income:
        <p className="totalAmount__income">
          {Dinero({ amount: income, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}
        </p>
        <progress max="100" value={income}></progress>
      </div>
      <div className="totalAmount2">
        Expenses:
        <p className="expenses">
          {Dinero({ amount: expenses, currency: "EUR" })
            .setLocale("fr-FR")
            .toFormat()}
        </p>
      </div>
    </>
  );
}

export default TotalTransaction;
