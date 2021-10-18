import "bootstrap/dist/css/bootstrap-grid.min.css";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className="spinner-border text-success" role="status" />
      <div className={styles.title}> Loading....</div>
    </div>
  );
}

export default Loading;
