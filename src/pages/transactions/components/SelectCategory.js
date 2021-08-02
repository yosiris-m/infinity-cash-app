import { useEffect, useState } from "react";
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
      <h2>Categories</h2>
      {categories.map((category, categories) => (
        <div key={categories} onClick={() => onSelect(category)}>
          {category.label}
        </div>
      ))}
      <button onClick={() => onCancel()}>Cancel</button>
    </div>
  );
}

export default SelectCategory;
