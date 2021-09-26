import { Card, Col, Table } from "react-bootstrap";
import Dinero from "dinero.js";
import moment from "moment";
import styles from "./TransactionItem.module.scss";

function TransactionItem({ date, transactions }) {
  const dateFormatted = moment(date).format("LL");

  return (
    <Col>
      <Card className="m-3">
        <Card.Header>{dateFormatted}</Card.Header>
        <Card.Body>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, idx) => {
                const { category, amount, type } = transaction;

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
