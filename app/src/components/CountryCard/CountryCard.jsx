import React from "react";
import { Collapse, Button, Card, Divider } from "antd";
import CardItem from "../../views/CardItem/CardItem";
import styles from "./countryCard.module.css";
const { Meta } = Card;

function CountryCard({ country, shownCard = {}, setShownCard, index, openModal, showDeleteConfirm, checkedList, selectedCuisines, filteredRating }) {
	return (
		<Card key={Date.now() + index} cover={<img className={styles.countryCard__img} alt={country.country} src={country.photo} />} className={styles.countryCard__card}>
			<div className={styles.countryCard__header}>
				<div className={styles.countryCard__title}>{country.country}</div>

				<div className={styles.countryCard__buttons}>
					{Object.keys(shownCard).length !== 0 && (
						<Button
							className={styles.countryCard__button}
							onClick={() => {
								setShownCard({});
							}}>
							Close card
						</Button>
					)}
					{Object.keys(shownCard).length === 0 && (
						<>
							<Button
								className={styles.countryCard__button}
								onClick={() => {
									openModal(index, "Edit");
								}}>
								Edit
							</Button>
							<Button
								className={styles.countryCard__button}
								onClick={() => {
									showDeleteConfirm(country.id);
								}}>
								Delete
							</Button>
						</>
					)}
				</div>
			</div>
			<Divider />
			{((checkedList.length > 1 && checkedList.includes("Attractions")) || checkedList.length === 0) && (
				<Collapse
					className={styles.countryCard__collapse}
					items={[
						{
							key: "1",
							label: "Attractions",
							children: (
								<div className={styles.countryCard__collapse_content}>
									{country.attractions.map((el, index) => (
										<CardItem
											key={Date.now() + index}
											name={el.name}
											id={el.id}
											photo={el.photo}
											location={el.location}
											description={el.description}
											rating={el.rating}
											website={el.website}
											cuisines={el.cuisines}
											priceRange={el.priceRange}
											country={country.country}
											type={"attractions"}
										/>
									))}
								</div>
							),
						},
					]}
				/>
			)}
			{((checkedList.length > 1 && checkedList.includes("Hotels")) || checkedList.length === 0) && (
				<Collapse
					className={styles.countryCard__collapse}
					items={[
						{
							key: "2",
							label: "Hotels",
							children: (
								<div className={styles.countryCard__collapse_content}>
									{country.hotels.map((el, index) => (
										<>
											{el.rating >= filteredRating && (
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
													country={country.country}
													type={"hotels"}
												/>
											)}
										</>
									))}
								</div>
							),
						},
					]}
				/>
			)}
			{((checkedList.length > 1 && checkedList.includes("Restaurants")) || checkedList.length === 0) && (
				<Collapse
					className={styles.countryCard__collapse}
					items={[
						{
							key: "3",
							label: "Restaurants",
							children: (
								<div className={styles.countryCard__collapse_content}>
									{country.restaurants.map((el, index) => (
										<>
											{el.cuisines &&
												(el.cuisines.filter((cuisine) => selectedCuisines.indexOf(cuisine) !== -1).length > 0 ||
													selectedCuisines.length === 0 ||
													selectedCuisines.indexOf("All") !== -1) && (
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
														country={country.country}
														type={"restaurants"}
													/>
												)}
										</>
									))}
								</div>
							),
						},
					]}
				/>
			)}
		</Card>
	);
}

export default CountryCard;
