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
      Add Category
      <h2>Create a new category</h2>
      <Link to="/home">
        <div>
          <i className="fas fa-arrow-left" />
        </div>
        <span> home</span>
      </Link>
      <form className={styles.wrapper}>
        <input
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />

        <div
          className={styles.radio}
          onChange={(event) => setType(event.target.value)}
        >
          <label>
            <input type="radio" name="type" value="income" />
            Income
          </label>
          <label>
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
