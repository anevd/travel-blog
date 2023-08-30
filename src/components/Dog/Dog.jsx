import React from "react";
import styles from "./dog.module.css";

function Dog({ image, joke }) {
	return (
		<div className={styles.dog}>
			<div className={styles.dog__joke}>{joke}</div>
			<img src={image} alt="dog icon" className={styles.dog__image} />
		</div>
	);
}

export default Dog;
