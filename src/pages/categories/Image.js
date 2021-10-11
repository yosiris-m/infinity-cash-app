import { categoryImages } from "../../data/category-images";
import styles from "./Image.modulo.scss";

function Image({ onSelectImage }) {
  return (
    <div className={styles.wrapper}>
      {categoryImages.map((img, idx) => (
        <span key={idx} onClick={() => onSelectImage(img)}>
          <i className={img}></i>
        </span>
      ))}
    </div>
  );
}
export default Image;
