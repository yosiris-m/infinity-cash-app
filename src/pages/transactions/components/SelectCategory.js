import { useEffect, useState } from "react";
import "../components/SelectCategory.css";
import { getCategories } from "../../../services/categories";

function SelectCategory({ onSelect, onCancel, transactionType }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.type === transactionType
  );

  return (
    <div>
      <h2 className="titleCategory">Select category:</h2>
      {filteredCategories.map((category, categories) => (
        <div
          className="category"
          key={categories}
          onClick={() => onSelect(category, category.id)}
        >
          <i class={`fas fa-${category.image}`}></i>
          {category.label}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-danger CancelCategory"
        onClick={() => onCancel()}
      >
        Cancel
      </button>
    </div>
  );
}

export default SelectCategory;
