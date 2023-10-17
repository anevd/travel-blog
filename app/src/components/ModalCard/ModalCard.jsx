import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Card, notification } from "antd";
import { collectChangesAC } from "../../store/actions/mainActions";
import styles from "./modalCard.module.css";

function ModalCard({ country, category, place, index }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const { changesСollection } = useSelector((store) => store.mainStore);
	function handleInput(event, property, id, country) {
		// dispatch(collectChangesAC(event.target.value, property, id, country));
	}

	return (
		<Card
			size="small"
			className={styles.modalCard}
			title={
				<div className={styles.modalCard__title}>
					<div className={styles.modalCard__titleText}>Place</div>
					<Input
						required
						value={place.name}
						onChange={(event) => {
							handleInput(event, "name", place.id, country);
						}}
					/>
				</div>
			}>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Location</div>
				<Input className={styles.modalCard__input} value={place.location} onChange={(event) => handleInput(event, "location", place.id, country)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Photo</div>
				<Input className={styles.modalCard__input} value={place.photo} onChange={(event) => handleInput(event, "photo", place.id, country)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Description</div>
				<Input className={styles.modalCard__input} value={place.description} onChange={(event) => handleInput(event, "description", place.id, country)} />
			</div>
		</Card>
	);
}

export default ModalCard;
