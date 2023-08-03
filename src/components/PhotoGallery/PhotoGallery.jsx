import React from "react";
import { Carousel } from "antd";
import styles from "./photoGallery.module.css";
import carouselData from "../../json/carousel";

const PhotoGallery = () => {
	return (
		<div className={styles.photoGallery}>
			<Carousel autoplay className={`container ${styles.photoGallery__carousel}`}>
				{carouselData.map((el) => (
					<div>
						<h3 style={{ backgroundImage: `url(${el.src})` }} className={styles.contentStyle}>
							{el.name}
						</h3>
					</div>
				))}
			</Carousel>
		</div>
	);
};
export default PhotoGallery;
