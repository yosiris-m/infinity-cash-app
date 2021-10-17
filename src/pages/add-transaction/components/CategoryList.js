import React from "react";
import styles from "./CategoryList.module.scss";

function CategoryList({ categories, onSelectCategory, selectedCategory }) {
  return (
    <div className={styles.container}>
      {categories.map((category, categories) => (
        <div
          className={
            category.id === selectedCategory.id
              ? `${styles.category} ${styles.categorySelected}`
              : styles.category
          }
          key={categories}
          onClick={() => onSelectCategory(category)}
        >
          <div className={styles.imgCategoryBox}>
            <i className={category.image} />
          </div>
          <div>{category.label}</div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
