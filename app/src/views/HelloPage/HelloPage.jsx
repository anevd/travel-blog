import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import About from "../About/About";
import PhotoSlider from "../../components/PhotoSlider/PhotoSlider";
import styles from "./helloPage.module.css";
import Dog from "../../components/Dog/Dog";
import { getDogThunk, getCarouselDataThunk } from "../../store/actions/mainActions";

function HelloPage() {
	const dispatch = useDispatch();
	const { dog, carouselData } = useSelector((store) => store.mainStore);
	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(carouselData).length === 0) {
			dispatch(getCarouselDataThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
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
