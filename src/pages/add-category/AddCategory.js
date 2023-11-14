import { useState } from "react";
import { createCategory } from "../../services/categories";
import styles from "./AddCategory.module.scss";
import ImageList from "./components/ImageList";
import Button from "../../components/Button";
import { Link, useHistory, useParams } from "react-router-dom";

function AddCategory() {
  const { type } = useParams();
  const [label, setLabel] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (selectedImage === "") {
      alert("Please, select a image");
      return;
    }

    createCategory(label, type, selectedImage)
      .then(() => {
        setLabel("");
        setSelectedImage("");

        history.push(`/add-transaction/${type}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/home" className={styles.categoryLink}>
          <i className="fas fa-arrow-left" />
          <p className={styles.title}>Regresar</p>
        </Link>
      </header>

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <fieldset className={styles.fielset}>
          <legend>Añadir categoria</legend>
          <div className={styles.image}>
            <ImageList
              onSelectImage={(img) => setSelectedImage(img)}
              selectedImage={selectedImage}
            />
          </div>

          <label className={styles.label}>
            Nombre de la categoria
            <input
              className={styles.labelInput}
              required
              type="text"
              value={label}
              placeholder=""
              onChange={(event) => setLabel(event.target.value)}
            />
          </label>
          <Button label="Añadir" type="submit" />
        </fieldset>
      </form>
    </div>
  );
}
export default AddCategory;
