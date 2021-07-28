import { Card, Col, Row } from "react-bootstrap";
import Dinero from "dinero.js";
import moment from "moment";
import "../components/TransactionItem.css";
function TransactionItem({ date, amount, category }) {
  const price = Dinero({ amount, currency: "EUR" })
    .setLocale("fr-FR")
    .toFormat();
  const dateFormatted = moment(date).format("LL");
  return (
    <main className="mainItem">
      <Col>
        <Card className="m-3">
          <Card.Header>{dateFormatted}</Card.Header>
          <Card.Body>
            <Row>
              <Col className="category">{category}</Col>
              <Col className="amount">{price}</Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </main>
  );
}

export default TransactionItem;
