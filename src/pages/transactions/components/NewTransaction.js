import "../components/NewTransaction.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { createTransaction } from "../../../services/transactions";
import moment from "moment";
import { FormControl, InputGroup } from "react-bootstrap";

function NewTransaction() {
  const now = moment().format("YYYY-MM-DD");
  const history = useHistory();

  const [amount, setAmount] = useState("");
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(now);
  const [transactionType, setTransactionType] = useState("expense");

  const handleInputAmount = (ev) => {
    const newAmount = ev.target.value;
    setAmount(newAmount);
  };

  const handleSelectDate = (ev) => {
    const selectedDate = ev.target.value;
    setSelectedDate(selectedDate);
  };

  const handleSelectCategory = () => {
    setShowSelectCategory(true);
    setSelectedCategory();
  };

  const handleSelectTransactionType = (ev) => {
    setTransactionType(ev.target.value);
    setSelectedCategory("");
  };

  if (showSelectCategory) {
    return (
      <SelectCategory
        onSelect={(category) => {
          setShowSelectCategory(false);
          setSelectedCategory(category);
        }}
        onCancel={() => {
          setShowSelectCategory(false);
          setSelectedCategory("");
        }}
        transactionType={transactionType}
      />
    );
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    createTransaction(amount, selectedDate, selectedCategory, transactionType)
      .then(() => {
        setAmount("");
        setSelectedDate(now);
        setSelectedCategory("");
        history.push("/transactions");
      })
      .catch((error) => {
        console.error(error); // TODO print error
      });
  };

  return (
    <main className="AddAmount">
      <h4 className="title">New transaction</h4>
      <div className="wrapper">
        <div className="form-group NewAmount">
          <select
            className="options"
            value={transactionType}
            onChange={handleSelectTransactionType}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <InputGroup className="mb-3  ">
            <FormControl
              type="number"
              min="1"
              placeholder="0.0"
              value={amount}
              onChange={handleInputAmount}
            />
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup>
        </div>

        <input
          className="monthNewTransaction"
          type="date"
          max={now}
          onChange={handleSelectDate}
          value={selectedDate}
        />
        <Link className="seletedCategory" to="#" onClick={handleSelectCategory}>
          <span>Select category</span>
          <i className="fas fa-search lup"></i>
        </Link>

        <a href="categories" className="seletedCategory">
          <span>Created new category</span>
          {/* <i class="fas fa-search lup"></i> */}
        </a>

        <div className="categorySelected">{selectedCategory.label}</div>
        <div className="buttonBox">
          <button
            type="button"
            className="btn btn-danger buttonCancel"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-danger buttonAdd"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}

export default NewTransaction;
