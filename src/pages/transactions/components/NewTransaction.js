import "../components/NewTransaction.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { createTransaction } from "../../../services/transactions";

function NewTransaction() {
  const [amount, setAmount] = useState(0);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState([]);

  const handleInput = (ev) => {
    const newAmount = ev.target.value;
    setAmount(newAmount);
  };

  const handleSelectDate = (ev) => {
    const selectedMonth = ev.target.value;
    console.log("selectedMonth", selectedMonth);
    setSelectedMonth(selectedMonth);
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
        onCancel={() => setShowSelectCategory(false)}
      />
    );
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    createTransaction(amount, selectedMonth, selectedCategory);
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
        />
      </div>
      {/* <SelectDate onSelect={handleSelectDate} value={selectedMonth} /> */}
      <input
        className="month"
        type="month"
        onChange={handleSelectDate}
        value={selectedMonth}
      />
      <Link to="#" onClick={handleSelectCategory}>
        Select{" "}
      </Link>
      <div>{selectedCategory.label}</div>
      <div>
        <button className="buttonCancel" type="submit" onClick={handleSubmit}>
          Add
        </button>
        <button className="buttonAdd" type="submit">
          Cancel
        </button>
      </div>
    </main>
  );
}

export default NewTransaction;
