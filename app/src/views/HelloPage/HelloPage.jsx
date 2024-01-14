import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogThunk } from "../../store/actions/dogActions";
import { getCarouselDataThunk } from "../../store/actions/aboutActions";
import About from "../About/About";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import Dog from "../../components/Dog/Dog";
import styles from "./helloPage.module.css";

function HelloPage() {
	const dispatch = useDispatch();
	const { dog } = useSelector((store) => store.dogStore);
	const { carouselData } = useSelector((store) => store.aboutStore);
	const { images: dogImages, jokes: dogJokes } = dog;

	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(carouselData).length === 0) {
			dispatch(getCarouselDataThunk());
		}
	}, []);

	return (
		<section>
			<About />
			<div className={styles.photoSlider}>
				<h2 className={styles.photoSlider_header}>Recent trip</h2>
				<PhotoSlider data={carouselData} className={styles.photoSlider__carousel} />
			</div>
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[2].src} joke={dogJokes[2].text} />}
		</section>
	);
}

export default HelloPage;
