import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Rate } from "antd";
import { getDogThunk, getCountriesThunk } from "../../store/actions/mainActions";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import Dog from "../../components/Dog/Dog";
import styles from "./cardInfo.module.css";

function CardInfo() {
	const dispatch = useDispatch();
	const { dog, countries } = useSelector((store) => store.mainStore);
	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(countries).length === 0) {
			dispatch(getCountriesThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
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
							apikey: "47e5552b-eff0-4a17-9a72-e782820a3edd",
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
								<div>{currentCard.cuisines.join(", ")}</div>
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
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[0].src} joke={dogJokes[1].text} />}
		</section>
	);
}

export default CardInfo;
