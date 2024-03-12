import styles from "./style.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <span></span>
      <span></span>
      <span style={{ display: "none" }}></span>
      <span></span>
      <span style={{ display: "none" }}></span>
      <span></span>
      <span style={{ display: "none" }}></span>
      <span></span>
      <span style={{ display: "none" }}></span>
      <span></span>
    </div>
  );
}
