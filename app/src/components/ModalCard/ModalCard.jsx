import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Card, Rate, notification } from "antd";
import { collectChangesAC } from "../../store/actions/mainActions";
import styles from "./modalCard.module.css";

function ModalCard({ country, category, place, index, changeModalCard }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//
	// const { changesСollection } = useSelector((store) => store.mainStore);
	// function handleInput(event, property, id, country) {
	// 	changeModalCard(category, property, value, index);
	// }
	function handleInput(event, category, property, index) {
		changeModalCard(category, property, event, index);
	}

	// console.log(place);

	return (
		<Card
			size="small"
			className={styles.modalCard}
			title={
				<div className={styles.modalCard__title}>
					<div className={styles.modalCard__titleText}>Place</div>
					<Input
						value={place.name}
						onChange={(event) => {
							handleInput(event, category, "name", index);
						}}
					/>
				</div>
			}>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Location</div>
				<Input value={place.location} onChange={(event) => handleInput(event, category, "location", index)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Сoordinates</div>
				<Input value={place.coordinates} onChange={(event) => handleInput(event, category, "coordinates", index)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Photo</div>
				<Input value={place.photo} onChange={(event) => handleInput(event, category, "photo", index)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Description</div>
				<Input value={place.description} onChange={(event) => handleInput(event, category, "description", index)} />
			</div>
			{category === "hotels" && (
				<>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Rating</div>
						<Rate defaultValue={place.rating} onChange={(event) => handleInput(event, category, "rating", index)} />
					</div>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Website</div>
						<Input value={place.website} onChange={(event) => handleInput(event, category, "website", index)} />
					</div>
				</>
			)}
			{category === "restaurants" && (
				<>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Price range</div>
						<Input required value={place.priceRange} onChange={(event) => handleInput(event, category, "priceRange", index)} />
					</div>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Cuisines</div>
						<Input required value={place.cuisines} onChange={(event) => handleInput(event, category, "cuisines", index)} />
					</div>
				</>
			)}

			{/* <Input required className={styles.modalCard__input} value={place.photoCarousel} onChange={(event) => handleInput(event, category, "photoCarousel", index, country)} /> */}
		</Card>
	);
}

export default ModalCard;
