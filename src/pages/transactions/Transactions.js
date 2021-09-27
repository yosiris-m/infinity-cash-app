import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import { getTransactions } from "../../services/transactions";
import TotalTransaction from "./components/TotalTransaction";
import SelectDate from "./components/SelectDate";
import TransactionItem from "./components/TransactionItem";
import styles from "./Transaction.module.scss";

function Transactions() {
  const now = moment().format("YYYY-MM");
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = (month) => {
    const from = `${month}-01`;
    const to = moment(month).endOf("month").format("YYYY-MM-DD");

    getTransactions({ from, to }).then((transactions) => {
      setTransactions(transactions);
    });
  };

  const handleSelectDate = (month) => {
    fetchTransactions(month);
  };

  useEffect(() => {
    fetchTransactions(now);
  }, [now]);

  console.log("transactions ->", transactions);
  const transactionsByDate = {};
  for (const transaction of transactions) {
    if (!transactionsByDate[transaction.date]) {
      transactionsByDate[transaction.date] = [];
    }
    transactionsByDate[transaction.date].push(transaction);
  }
  console.log("transactionsByDate ->", transactionsByDate);

  return (
    <Container>
      <SelectDate initValue={now} maxValue={now} onSelect={handleSelectDate} />
      <TotalTransaction transactions={transactions} />
      <p className={styles.summary}>Resumen transaciones </p>
      <Row xs={1} sm={2}>
        {Object.keys(transactionsByDate).map((date, idx) => (
          <TransactionItem
            key={idx}
            date={date}
            transactions={transactionsByDate[date]}
          />
        ))}
      </Row>

      <Nav.Item>
        <Nav.Link href="/NewTransaction">
          <div className={styles.buttonNewTransaction}>+</div>
        </Nav.Link>
      </Nav.Item>
    </Container>
  );
}

export default Transactions;
