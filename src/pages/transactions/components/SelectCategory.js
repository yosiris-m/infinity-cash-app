import { useEffect, useState } from "react";
import styles from "./SelectCategory.module.scss";
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
    <div className={styles.box}>
      <div className={styles.container}>
        {filteredCategories.map((category, categories) => (
          <div
            className={styles.category}
            key={categories}
            onClick={() => onSelect(category, category.id)}
          >
            <div className={styles.imgCategoryBox}>
              <i class={`fas fa-${category.image}`}></i>
            </div>

            <span>{category.label} </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.CancelCategory}
        onClick={() => onCancel()}
      >
        Cancel
      </button>
    </div>
  );
}

export default SelectCategory;
