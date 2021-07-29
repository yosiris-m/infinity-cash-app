import "../components/NewTransaction.css";
import { useState } from "react";
import SelectDate from "./SelectDate";
import { Link } from "react-router-dom";
// import SelectCategory from "./SelectCategory";

function NewTransaction() {
  const [amount, setAmount] = useState(0);
  const [showSelectCategory, setShowSelectCategory] = useState(false);

  const handleInput = (ev) => {
    const newAmount = ev.target.value;
    setAmount(newAmount);
    console.log(newAmount);
  };

  const handleSelectDate = (selectedMonth) => {
    console.log("selectedMonth", selectedMonth);
  };

  const handleSelectCategory = () => {
    setShowSelectCategory(true);
  };

  if (showSelectCategory) {
    return (
      <div>
        Category
        <button onClick={() => setShowSelectCategory(false)}>Return</button>
      </div>
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
