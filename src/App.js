import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./pages/home/Home";

import AddTransaction from "./pages/add-transaction/AddTransaction";
import AddCategory from "./pages/add-category/AddCategory";

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/add-transaction/:type">
              <AddTransaction />
            </Route>
            <Route path="/add-category">
              <AddCategory />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </div>
      </Router>
    </>
  );
}
