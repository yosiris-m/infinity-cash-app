import { Card, Col, Table } from "react-bootstrap";
import Dinero from "dinero.js";
import moment from "moment";
import styles from "./TransactionItem.module.scss";

function TransactionItem({ date, transactions }) {
  const dateFormatted = moment(date).format("LL");

  return (
    <Col className={styles.container}>
      <Card className="m-3">
        <Card.Header>{dateFormatted}</Card.Header>
        <Card.Body>
          <Table responsive="sm" className={styles.box}>
            <thead className={styles.wrapper}>
              <tr>
                <th className={styles.tdCategory}>Category</th>
                <th className={styles.tdAmount}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, idx) => {
                const { category, amount, type, image } = transaction;

                // let className;
                // if (type === "income") {
                //   className = styles.income;
                // } else {
                //   className = styles.expense;
                // }

                // const className =
                //   type === "income" ? styles.income : styles.expense;

                const price = Dinero({ amount, currency: "EUR" })
                  .setLocale("es-ES")
                  .toFormat();
                return (
                  <tr key={idx}>
                    <td>{category}</td>
                    <td>
                      <i className={`fas fa-${image}`}></i>
                    </td>
                    <td className={styles[type]}>{price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TransactionItem;
