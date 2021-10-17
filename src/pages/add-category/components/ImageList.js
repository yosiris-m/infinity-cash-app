import { categoryImages } from "../../../data/category-images";
import styles from "./ImageList.module.scss";

function ImageList({ onSelectImage, selectedImage }) {
  return (
    <div className={styles.wrapper}>
      {categoryImages.map((img, idx) => (
        <div
          key={idx}
          className={
            img === selectedImage
              ? `${styles.img} ${styles.selectedImage}`
              : styles.img
          }
          onClick={() => onSelectImage(img)}
        >
          <i className={img} />
        </div>
      ))}
    </div>
  );
}
export default ImageList;
