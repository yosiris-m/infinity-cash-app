import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { getTransactions } from "../services/transactions";
import TransactionItem from "./TransactionItem";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions({
      from: "2000-01-01",
      to: "2021-12-31",
    }).then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  return (
    <>
      <h2>Transactions</h2>
      <Row xs={1} sm={2}>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </Row>
    </>
  );
}

export default Transactions;
