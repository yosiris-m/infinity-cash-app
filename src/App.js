import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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
import "../src/App.css";
import NewTransaction from "./pages/transactions/components/NewTransaction";

export default function App() {
  return (
    <Router>
      <div>
        <Nav variant="tabs" defaultActiveKey="/home" className="transaction">
          <Nav.Item>
            <img src={img1} alt="cash-flow" className="transactionImg" />
            <Nav.Link href="/transactions" className="transactions">
              Transactions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <img src={img2} alt="calendar" className="reportsImg" />
            <Nav.Link href="/reports">Reports</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <img src={img3} alt="binoculars" className="categoriesImg" />
            <Nav.Link href="/categories">Categories</Nav.Link>
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
