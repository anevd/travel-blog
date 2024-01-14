import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutDataThunk } from "../../store/actions/aboutActions";
import styles from "./about.module.css";

function About() {
	const dispatch = useDispatch();
	const { helloData } = useSelector((store) => store.aboutStore);
	useEffect(() => {
		if (Object.keys(helloData).length === 0) {
			dispatch(getAboutDataThunk());
		}
	}, []);
	return (
		<div className={`${styles.about} container`}>
			<img className={styles.about__img} src={helloData.src} alt={helloData.alt} />
			<div className={styles.about__descr}>
				<p>{helloData.firstParagraph}</p>
				<p>{helloData.secondParagraph}</p>
			</div>
		</div>
	);
}

export default About;
