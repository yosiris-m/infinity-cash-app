import "../components/NewTransaction.css";
import { useState } from "react";
import SelectDate from "./SelectDate";

function NewTransaction() {
  const [addTransaction, setAddTransaction] = useState([]);

  const handleInput = (ev) => {
    const NewAddTransaction = ev.target.value;
    setAddTransaction(NewAddTransaction);
  };

  return (
    <>
      <h4>New Transaction</h4>
      <div className="NewAmount">
        <label> Amount</label>
        <input
          type="text"
          className="input"
          value={addTransaction}
          onChange={handleInput}
        />
      </div>
      <SelectDate />
      <p>select category</p>
      <button>Cancel</button>
      <button>Add</button>
    </>
  );
}

export default NewTransaction;
