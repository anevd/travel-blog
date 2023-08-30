import React, { useContext } from "react";
import About from "../About/About";
import PhotoSlider from "../../components/PhotoSlider/PhotoSlider";
import styles from "./helloPage.module.css";
import carouselData from "../../json/carousel";
import Dog from "../../components/Dog/Dog";
import { globalContext } from "../../contexts/globalContext";

function HelloPage() {
	const { dogImages, dogJokes } = useContext(globalContext);
	return (
		<section>
			<About />
			<div className={styles.photoSlider}>
				<h2 className={styles.photoSlider_header}>Recent trip</h2>
				<PhotoSlider data={carouselData} />
			</div>
			<Dog image={dogImages[2].src} joke={dogJokes[2].text} />
		</section>
	);
}

export default HelloPage;
