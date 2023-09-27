import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import { Card } from "antd";
import styles from "./journey.module.css";
import CardItem from "../../components/CardItem/CardItem";
import Dog from "../../components/Dog/Dog";
import { getDogThunk, getCountriesThunk } from "../../store/actions/mainActions";

const Journey = () => {
	const dispatch = useDispatch();
	const { dog, countries } = useSelector((store) => store.mainStore);
	useEffect(() => {
		dispatch(getDogThunk());
		dispatch(getCountriesThunk());
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
	return (
		<section className={styles.journey}>
			<div className="container">
				<h2 className={styles.journey__title}>What to visit, where to eat and stay</h2>
				<div className={styles.journey__content}>
					{countries.map((elem, index) => (
						<Card key={Date.now() + index} title={elem.country} className={styles.journey__card}>
							<Collapse
								className={styles.journey__collapse}
								items={[
									{
										key: "1",
										label: "Attractions",
										children: (
											<div className={styles.journey__collapse_content}>
												{elem.attractions.map((el, index) => (
													<CardItem
														key={Date.now() + index}
														name={el.name}
														id={el.id}
														photo={el.photo}
														location={el.location}
														rating={el.rating}
														website={el.website}
														cuisines={el.cuisines}
														priceRange={el.priceRange}
														country={elem.country}
														type={"attractions"}
													/>
												))}
											</div>
										),
									},
								]}
							/>
							<Collapse
								className={styles.journey__collapse}
								items={[
									{
										key: "2",
										label: "Hotels",
										children: (
											<div className={styles.journey__collapse_content}>
												{elem.hotels.map((el, index) => (
													<CardItem
														key={Date.now() + index}
														name={el.name}
														id={el.id}
														photo={el.photo}
														location={el.location}
														rating={el.rating}
														website={el.website}
														cuisines={el.cuisines}
														priceRange={el.priceRange}
														index={index}
														country={elem.country}
														type={"hotels"}
													/>
												))}
											</div>
										),
									},
								]}
							/>
							<Collapse
								className={styles.journey__collapse}
								items={[
									{
										key: "3",
										label: "Restaurants",
										children: (
											<div className={styles.journey__collapse_content}>
												{elem.restaurants.map((el, index) => (
													<CardItem
														key={Date.now() + index}
														name={el.name}
														id={el.id}
														photo={el.photo}
														location={el.location}
														rating={el.rating}
														website={el.website}
														cuisines={el.cuisines}
														priceRange={el.priceRange}
														index={index}
														country={elem.country}
														type={"restaurants"}
													/>
												))}
											</div>
										),
									},
								]}
							/>
						</Card>
					))}
				</div>
			</div>
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[3].src} joke={dogJokes[0].text} />}
		</section>
	);
};
export default Journey;
