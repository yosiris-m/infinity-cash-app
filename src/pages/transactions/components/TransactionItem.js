import { Card, Col, Row } from "react-bootstrap";
import Dinero from "dinero.js";
import moment from "moment";

function TransactionItem({ date, amount, category }) {
  const price = Dinero({ amount, currency: "EUR" })
    .setLocale("fr-FR")
    .toFormat();
  const dateFormatted = moment(date).format("LL");
  return (
    <Col>
      <Card className="m-3">
        <Card.Header>{dateFormatted}</Card.Header>
        <Card.Body>
          <Row>
            <Col>{category}</Col>
            <Col>{price}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TransactionItem;
