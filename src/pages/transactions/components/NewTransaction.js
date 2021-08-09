import "../components/NewTransaction.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { createTransaction } from "../../../services/transactions";
import moment from "moment";
import Categories from "../../categories/Categories";
import Reports from "../../reports/Reports";

function NewTransaction() {
  const now = moment().format("YYYY-MM-DD");
  const history = useHistory();

  const [amount, setAmount] = useState();
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(now);

  const handleInput = (ev) => {
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
      />
    );
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    createTransaction(amount, selectedDate, selectedCategory);
  };

  return (
    <main className="AddAmount">
      <h4>New Transaction</h4>
      <div className="NewAmount">
        <label> Amount</label>
        <input
          type="text"
          className="input"
          value={amount}
          onChange={handleInput}
          placeholder="-350"
        />
      </div>

      <input
        className="monthNewTransaction"
        type="date"
        max={now}
        onChange={handleSelectDate}
        value={selectedDate}
      />
      <Link className="seletedCategory" to="#" onClick={handleSelectCategory}>
        Select category
      </Link>
      <div>{selectedCategory.label}</div>
      <div>
        <button
          className="buttonCancel"
          type="cancel"
          onClick={() => {
            history.goBack(Categories, Reports);
          }}
        >
          Cancel
        </button>
        <button className="buttonAdd" type="submit" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </main>
  );
}

export default NewTransaction;
