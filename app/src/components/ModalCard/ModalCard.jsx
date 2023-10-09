import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Card } from "antd";
import styles from "./modalCard.module.css";

function ModalCard({ country, category, id, name, photo, location, description, rating, website, priceRange, cuisines }) {
	const [editId, setEditId] = useState(null);
	const [newPhoto, setNewPhoto] = useState(photo);
	const [newName, setNewName] = useState(name);
	const [newLocation, setNewLocation] = useState(location);
	const [newDescription, setNewDescription] = useState(description);
	const [newRating, setNewRating] = useState(rating);
	const [newWebsite, setNewWebsite] = useState(website);
	const [newPriceRange, setNewPriceRange] = useState(priceRange);
	const [newCuisines, setNewCuisines] = useState(cuisines);
	return (
		<Card
			size="small"
			className={styles.modalCard}
			title={
				<Form.Item
					className={styles.form__item}
					label="Place"
					name="place"
					rules={[
						{
							required: true,
							message: "Please input a country name",
						},
					]}>
					<Input id={`${id}-name`} defaultValue={newName} value={newName} onChange={(event) => setEditId(event.target.id)} />
				</Form.Item>
			}>
			<Form.Item
				className={styles.form__item}
				label="Location"
				name="location"
				rules={[
					{
						required: true,
					},
				]}>
				<Input
					value={newLocation}
					defaultValue={newLocation}
					onChange={(event) => {
						setNewLocation(event.target.value);
					}}
				/>
			</Form.Item>
			<Form.Item
				className={styles.form__item}
				label="Photo"
				name="photo"
				rules={[
					{
						required: true,
					},
				]}>
				<Input
					value={newPhoto}
					defaultValue={newPhoto}
					onChange={(event) => {
						setNewPhoto(event.target.value);
					}}
				/>
			</Form.Item>
			<Form.Item
				className={styles.form__item}
				label="Description"
				name="description"
				rules={[
					{
						required: true,
					},
				]}>
				<Input
					value={newDescription}
					defaultValue={newDescription}
					onChange={(event) => {
						setNewDescription(event.target.value);
					}}
				/>
			</Form.Item>
		</Card>
	);
}

export default ModalCard;
