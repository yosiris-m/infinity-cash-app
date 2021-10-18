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
import { useEffect, useState } from "react";
import Loading from "./pages/home/loading/Loading";

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
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
      )}
    </>
  );
}
