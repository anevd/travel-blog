import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./photoSlider.module.css";

const PhotoSlider = ({ data }) => {
	const sliderSettings = {
		infinite: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
		autoplay: false,
		autoplaySpeed: 5000,
	};

	return (
		<Slider {...sliderSettings} className={styles.photoSlider__carousel}>
			{data.map((card, index) => (
				<div key={index} className={styles.photoSlider__item}>
					<h3 className={styles.photoSlider__title}>{card.name}</h3>
					<div className={styles.photoSlider__img}>
						<img alt={card.name} src={card.photo} className={styles.photoSlider__src} />
					</div>
					<p className={styles.photoSlider__descr}>{card.description}</p>
				</div>
			))}
		</Slider>
	);
};

export default PhotoSlider;
