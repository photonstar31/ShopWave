import React from "react";
import styles from "../../../styles/Loading.module.css";

const Loading: React.FC<{ width: number; color: string }> = ({
  width,
  color,
}) => {
  return (
    <div
      className={styles.loadingContainer}
      style={{ width: width, height: width }}
    >
      <div className={styles.loadingInnerContainer}>
        <div className={styles.loading} style={{ borderColor: color }} />
      </div>
    </div>
  );
};

export default Loading;
