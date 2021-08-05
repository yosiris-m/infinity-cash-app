import { useEffect, useState } from "react";
import "../components/SelectCategory.css";
import { getCategories } from "../../../services/categories";

function SelectCategory({ onSelect, onCancel }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div>
      <h2 className="titleCategory">Select category:</h2>
      {categories.map((category, categories) => (
        <div
          className="category"
          key={categories}
          onClick={() => onSelect(category, category.id)}
        >
          {category.label}
        </div>
      ))}
      <button className="CancelCategory" onClick={() => onCancel()}>
        Cancel
      </button>
    </div>
  );
}

export default SelectCategory;
