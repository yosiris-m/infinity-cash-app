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
        <p
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
            <span>{category.label}</span>
          </div>
        </p>
      ))}
      <Link to={`/add-category/${type}`} className={styles.addCategory}>
        <div className={styles.newCategory}>
          <i className="fas fa-plus" />
        </div>
      </Link>
    </div>
  );
}

export default CategoryList;
