import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../src/App.module.scss";
// import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Transactions from "./pages/transactions/Transactions";
import Categories from "./pages/categories/Categories";
import Reports from "./pages/reports/Reports";
import { Nav } from "react-bootstrap";
import img1 from "../src/images/cash-flow.svg";
import img2 from "../src/images/calendar.svg";
import img3 from "../src/images/binoculars.svg";
// import "../src/App.css";
import NewTransaction from "./pages/transactions/components/NewTransaction";

export default function App() {
  return (
    <Router>
      <div>
        <Nav
          variant="tabs"
          defaultActiveKey="/home"
          className={styles.transaction}
        >
          <Nav.Item>
            <img src={img1} alt="cash-flow" className={styles.transactionImg} />
            <Nav.Link href="/transactions" className={styles.transactions}>
              Transactions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <img src={img2} alt="calendar" className={styles.reportsImg} />
            <Nav.Link href="/reports" className={styles.transactions}>
              Reports
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <img src={img3} alt="binoculars" className={styles.categoriesImg} />
            <Nav.Link href="/categories" className={styles.transactions}>
              Categories
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/NewTransaction">
            <NewTransaction />
          </Route>
          <Redirect to="/transactions" />
        </Switch>
      </div>
    </Router>
  );
}
