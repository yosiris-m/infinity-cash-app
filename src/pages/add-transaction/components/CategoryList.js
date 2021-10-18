import React from "react";
import styles from "./CategoryList.module.scss";
import { Link } from "react-router-dom";

function CategoryList({
  categories,
  onSelectCategory,
  selectedCategory,
  type,
}) {
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
      <Link to={`/add-category/${type}`} className={styles.addCategory}>
        <div>New Category</div>
      </Link>
    </div>
  );
}

export default CategoryList;
