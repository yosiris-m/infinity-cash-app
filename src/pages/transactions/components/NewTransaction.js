import "../components/NewTransaction.css";
import { useState } from "react";
import SelectDate from "./SelectDate";
import { Link } from "react-router-dom";
import SelectCategory from "./SelectCategory";

function NewTransaction() {
  const [amount, setAmount] = useState(0);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);

  const handleInput = (ev) => {
    const newAmount = ev.target.value;
    setAmount(newAmount);
  };

  const handleSelectDate = (selectedMonth) => {
    console.log("selectedMonth", selectedMonth);
  };

  const handleSelectCategory = () => {
    setShowSelectCategory(true);
    setSelectedCategory(true);
  };

  if (showSelectCategory) {
    return (
      <SelectCategory
        onSelect={(category) => {
          setShowSelectCategory(false);
          setSelectedCategory(category.label);
        }}
        onCancel={() => setShowSelectCategory(false)}
      />
    );
  }

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
      <SelectDate onSelect={handleSelectDate} />

      <div>{selectedCategory}</div>

      <Link to="#" onClick={handleSelectCategory}>
        Select{" "}
      </Link>

      <div>
        <button className="buttonCancel">Add</button>
        <button className="buttonAdd">Cancel</button>
      </div>
    </main>
  );
}

export default NewTransaction;
