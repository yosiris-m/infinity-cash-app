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

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (selectedImage === "") {
      alert("Please, select a image");
      return;
    }

    if (type === "") {
      alert("Please, select a transaction type");
      return;
    }

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
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/home">
          <i className="fas fa-arrow-left" />
        </Link>
        <h2 className={styles.title}>Add category</h2>
      </header>

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input
          className={styles.label}
          required
          type="text"
          value={label}
          placeholder="Name"
          onChange={(event) => setLabel(event.target.value)}
        />

        <div className={styles.boxType}>
          <div
            className={
              type === "income"
                ? `${styles.labelSelectedType}`
                : styles.labelType
            }
            onClick={() => setType("income")}
          >
            Income
          </div>
          <div
            className={
              type === "expense"
                ? `${styles.labelSelectedType}`
                : styles.labelType
            }
            onClick={() => setType("expense")}
          >
            Expense
          </div>
        </div>
        <div className={styles.image}>
          <ImageList
            onSelectImage={(img) => setSelectedImage(img)}
            selectedImage={selectedImage}
          />
        </div>
        <Button label="Add" type="submit" />
      </form>
    </div>
  );
}
export default AddCategory;
