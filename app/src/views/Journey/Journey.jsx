import React from "react";
import { Collapse } from "antd";
import { Card } from "antd";
import styles from "./journey.module.css";
import countries from "../../json/countries";
import CardItem from "../../components/CardItem/CardItem";
import Dog from "../../components/Dog/Dog";

const Journey = () => (
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
		<Dog />
	</section>
);
export default Journey;
