import moment from "moment";
import styles from "./TransactionList.module.scss";
import Dinero from "dinero.js";

function TransactionList({ transactions }) {
  const transactionsByDate = {};
  for (const transaction of transactions) {
    if (!transactionsByDate[transaction.date]) {
      transactionsByDate[transaction.date] = [];
    }
    transactionsByDate[transaction.date].push(transaction);
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(transactionsByDate).map((date, idx) => (
        <div key={idx} className={styles.box}>
          <p className={styles.date}>{moment(date).format("ll")}</p>

          {transactionsByDate[date].map((transaction, idx) => {
            const { category, amount, type, image } = transaction;

            const price = Dinero({ amount, currency: "EUR" })
              .setLocale("es-ES")
              .toFormat();

            return (
              <div key={idx} className={styles.rowBox}>
                <i className={image} />
                <span> {category}</span>
                <span className={`${styles.price} ${styles[type]}`}>
                  {price}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
