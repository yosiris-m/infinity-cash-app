import moment from "moment";
import styles from "./TransactionItem.module.scss";
import Dinero from "../../../../node_modules/dinero.js/build/esm/dinero";

function TransactionItem({ date, transactions }) {
  const dateFormatted = moment(date).format("LL");

  return (
    <div className={styles.box}>
      <div className={styles.date}>{dateFormatted}</div>

      {transactions.map((transaction, idx) => {
        const { category, amount, type, image } = transaction;

        const price = Dinero({ amount, currency: "EUR" })
          .setLocale("es-ES")
          .toFormat();

        return (
          <div key={idx} className={styles.rowBox}>
            <i className={image} />
            <span> {category}</span>
            <span className={`${styles.price} ${styles[type]}`}>{price}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionItem;
