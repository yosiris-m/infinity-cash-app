import { categoryImages } from "../../../data/category-images";
import styles from "./ImageList.module.scss";

function ImageList({ onSelectImage, selectedImage }) {
  return (
    <div className={styles.wrapper}>
      {categoryImages.map((img, idx) => (
        <span
          key={idx}
          className={img === selectedImage ? styles.selectedImage : styles.img}
          onClick={() => onSelectImage(img)}
        >
          <i className={img} />
        </span>
      ))}
    </div>
  );
}
export default ImageList;
