import "../components/NewTransaction.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { createTransaction } from "../../../services/transactions";

function NewTransaction() {
  const [amount, setAmount] = useState(0);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedMonth] = useState("");

  const handleInput = (ev) => {
    const newAmount = ev.target.value;
    setAmount(newAmount);
  };

  const handleSelectDate = (ev) => {
    const selected = ev.target.value;
    console.log("selectedMonth", selected);
    setSelectedMonth(selected);
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

  const createdTransaction = () => {
    let dateActuality = (selectedDate += 1);

    if (selectedDate !== dateActuality) {
      return (
        <p>
          Error en la operación por favor revice la fecha y vuelva a intentarlo
        </p>
      );
    } else {
      return <p>Operacion creada correctamente</p>;
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    createTransaction(amount, selectedDate, selectedCategory);
  };

  const handleReset = () => {
    createTransaction("");
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

      <input
        className="month"
        type="date"
        min="01-01-2021"
        onChange={handleSelectDate}
        value={selectedDate}
      />
      <Link className="seletedCategory" to="#" onClick={handleSelectCategory}>
        Select category{" "}
      </Link>
      <div>{selectedCategory.label}</div>
      <div>
        <button className="buttonCancel" type="submit" onClick={handleSubmit}>
          Add
        </button>
        <button className="buttonAdd" type="reset" onClick={handleReset}>
          Cancel
        </button>
      </div>
    </main>
  );
}

export default NewTransaction;
