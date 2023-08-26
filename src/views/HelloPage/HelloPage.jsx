import React from "react";
import About from "../About/About";
import PhotoSlider from "../../components/PhotoSlider/PhotoSlider";
import styles from "./helloPage.module.css";
import carouselData from "../../json/carousel";
import Dog from "../../components/Dog/Dog";

function HelloPage() {
	return (
		<section>
			<About />
			<div className={styles.photoSlider}>
				<h2 className={styles.photoSlider_header}>Recent trip</h2>
				<PhotoSlider data={carouselData} />
			</div>
			<Dog />
		</section>
	);
}

export default HelloPage;
