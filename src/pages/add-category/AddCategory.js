import { useState } from "react";
import { createCategory } from "../../services/categories";
import styles from "./AddCategory.module.scss";
import ImageList from "./components/ImageList";
import Button from "../../components/Button";
import { Link, useHistory } from "react-router-dom";

function AddCategory() {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  const onClickHandleSubmit = (ev) => {
    ev.preventDefault();
    createCategory(label, type, selectedImage)
      .then(() => {
        setLabel("");
        setType("");
        setSelectedImage("");

        history.push("/home");
      })
      .catch((error) => {
        console.error(error); // TODO print error
      });
  };

  return (
    <div>
      <header className={styles.header}>
        <Link to="/home">
          <i className="fas fa-arrow-left" />
        </Link>
        <h2 className={styles.title}>Add category</h2>
      </header>

      <form className={styles.wrapper}>
        <input
          className={styles.label}
          type="text"
          value={label}
          placeholder="category label"
          onChange={(event) => setLabel(event.target.value)}
        />

        <div
          className={styles.radio}
          onChange={(event) => setType(event.target.value)}
        >
          <label className={styles.labelType}>
            <input type="radio" name="type" value="income" checked />
            Income
          </label>
          <label className={styles.labelType}>
            <input type="radio" name="type" value="expense" /> Expense
          </label>
        </div>
        <div className={styles.image}>
          <ImageList
            onSelectImage={(img) => setSelectedImage(img)}
            selectedImage={selectedImage}
          />
        </div>

        <Button label="Add" type="submit" onClick={onClickHandleSubmit} />
      </form>
    </div>
  );
}
export default AddCategory;
