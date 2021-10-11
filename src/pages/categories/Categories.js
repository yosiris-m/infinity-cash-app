import { useState } from "react";
import Button from "../../components/Button";
import styles from "../categories/Categories.module.scss";
import { createCategory } from "../../../src/services/categories";
import Image from "./Image";

function Categories() {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const onHandleCreateLabel = (ev) => {
    setLabel(ev.target.value);
  };

  const onHandleCreateCategory = (ev) => {
    setType(ev.target.value);
  };

  const onClickHandleSubmit = (ev) => {
    ev.preventDefault();
    createCategory(label, type, image)
      .then(() => {
        setLabel("");
        setType("");
        setImage("");
      })

      .catch((error) => {
        console.error(error); // TODO print error
      });
  };

  return (
    <>
      <h2 ide="categories">Create a new category</h2>
      <form className={styles.wrapper}>
        <input type="text" value={label} onChange={onHandleCreateLabel} />

        <div
          className={styles.radio}
          value={type}
          onChange={onHandleCreateCategory}
        >
          <label className={styles.incomeCategories}>
            <input type="radio" value="income" />
            Income
          </label>
          <label className={styles.expenseCategories}>
            <input type="radio" value="expense" /> Expense
          </label>
        </div>
        <div className={styles.image} value={image}>
          <Image onSelectImage={(img) => setImage(img)} />
        </div>

        <Button label="Add" type="submit" onClick={onClickHandleSubmit} />
      </form>
    </>
  );
}

export default Categories;
