import React from "react";
import styles from "./about.module.css";
import data from "../../json/about";

function About() {
	return (
		<div className={`${styles.about} container`}>
			<img className={styles.about__img} src={data.src} alt={data.alt} />
			<div className={styles.about__descr}>
				<p>{data.firstParagraph}</p>
				<p>{data.secondParagraph}</p>
			</div>
		</div>
	);
}

export default About;
