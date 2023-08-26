import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./cardInfo.module.css";
import countries from "../../json/countries";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import PhotoSlider from "../../components/PhotoSlider/PhotoSlider";
import { Rate } from "antd";
import Dog from "../../components/Dog/Dog";

function CardInfo() {
	const { country, type, id } = useParams();
	const currentCountry = countries.filter((el) => el.country === country)[0];
	let currentCountryLocationType;
	for (let key in currentCountry) {
		if (key === type) {
			currentCountryLocationType = [...currentCountry[key]];
		}
	}
	const currentCard = currentCountryLocationType.find((el) => el.id === +id);
	const defaultState = {
		center: currentCard.coordinates,
		zoom: 13,
	};

	return (
		<section>
			<div className={styles.cardInfo__title} style={{ background: `url(${currentCard.photo}) center center/cover no-repeat` }}>
				<div className="container">
					<Link to="/journey">
						<button className={styles.cardInfo__button} onClick={() => window.scrollTo(0, 0)}>
							← Back
						</button>
					</Link>
					<div className={styles.cardInfo__titleContent}>
						<div className={styles.cardInfo__titleName}>{currentCard.name}</div>
						<div className={styles.cardInfo__titleLocation}>{currentCard.location}</div>
					</div>
					<YMaps
						query={{
							apikey: "a8a81363-9afa-4e0c-85c9-d2f5976857246",
							lang: "ru_RU",
						}}>
						<div className={styles.cardInfo__map}>
							<Map defaultState={defaultState} className={styles.cardInfo__mapContent}>
								<Placemark
									geometry={currentCard.coordinates}
									properties={{
										iconContent: currentCard.name,
									}}
									options={{
										preset: "islands#nightStretchyIcon",
									}}
								/>
							</Map>
						</div>
					</YMaps>
				</div>
			</div>
			<div className={`${styles.cardInfo__description} container`}>
				<div className={styles.cardInfo__summaryInfo}>
					{currentCard.rating && <Rate className={styles.cardInfo__rate} disabled allowHalf defaultValue={currentCard.rating} />}
					{currentCard.website && (
						<div>
							<a href={currentCard.website} target="_blank" rel="noreferrer" className={styles.cardInfo__website}>
								Website
							</a>
						</div>
					)}
					<div className={styles.cardInfo__restaurantInfo}>
						{currentCard.cuisines && (
							<div className={styles.cardInfo__cuisines}>
								<h3>CUISINES:</h3>
								<div>{currentCard.cuisines}</div>
							</div>
						)}
						{currentCard.priceRange && (
							<div className={styles.cardInfo__priceRange}>
								<h3>PRICE RANGE:</h3>
								<div>{currentCard.priceRange}</div>
							</div>
						)}
					</div>
				</div>
				<p className={styles.cardInfo__text}>{currentCard.description}</p>
			</div>
			{currentCard.photoCarousel && (
				<div className={styles.cardInfo__slider}>
					<PhotoSlider data={currentCard.photoCarousel} />
				</div>
			)}
			<Dog />
		</section>
	);
}

export default CardInfo;
