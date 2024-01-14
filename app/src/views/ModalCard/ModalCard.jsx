import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputNumber, Card, Rate, Select, Button } from "antd";
import { CloseOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getCuisinesThunk } from "../../store/actions/cuisinesActions";
import styles from "./modalCard.module.css";

function ModalCard({ country, category, place, changeModalCard, deleteModalCard, changePhotoCarousel }) {
	const dispatch = useDispatch();
	const { cuisines } = useSelector((store) => store.cuisinesStore);
	const [selectedItems, setSelectedItems] = useState([]);

	const options = cuisines;
	const filteredOptions = options.filter((o) => !selectedItems.includes(o));

	useEffect(() => {
		if (Object.keys(cuisines).length === 0) {
			dispatch(getCuisinesThunk());
		}
	}, []);

	function handleInput(event, category, property, id, index, photoCarouselField) {
		changeModalCard(category, property, event, id, index, photoCarouselField);
	}

	return (
		<Card
			size="small"
			className={styles.modalCard}
			title={
				<div className={styles.modalCard__title}>
					<div className={styles.modalCard__titleText}>
						<div>Place</div>
						<div className={styles.modalCard__delete}>{country[category].length > 1 && <CloseOutlined onClick={() => deleteModalCard(category, place.id)} />}</div>
					</div>
					<Input
						allowClear
						value={place.name}
						onChange={(event) => {
							handleInput(event, category, "name", place.id);
						}}
					/>
				</div>
			}>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Location</div>
				<Input allowClear value={place.location} onChange={(event) => handleInput(event, category, "location", place.id)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Сoordinates</div>
				<Input allowClear value={place.coordinates} onChange={(event) => handleInput(event, category, "coordinates", place.id)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Photo</div>
				<Input allowClear value={place.photo} onChange={(event) => handleInput(event, category, "photo", place.id)} />
			</div>
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Description</div>
				<Input allowClear value={place.description} onChange={(event) => handleInput(event, category, "description", place.id)} />
			</div>
			{category === "hotels" && (
				<>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Rating</div>
						<Rate allowHalf allowClear={false} defaultValue={place.rating} onChange={(event) => handleInput(event, category, "rating", place.id)} />
					</div>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Website</div>
						<Input allowClear value={place.website} onChange={(event) => handleInput(event, category, "website", place.id)} />
					</div>
				</>
			)}
			{category === "restaurants" && (
				<>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Price range</div>
						<InputNumber
							allowClear
							formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							min={0}
							max={1000}
							value={place.priceRange}
							onChange={(event) => handleInput(event, category, "priceRange", place.id)}
						/>
					</div>
					<div className={styles.modalCard__item}>
						<div className={styles.modalCard__itemText}>Cuisines</div>
						<Select
							mode="multiple"
							placeholder="Choose a cuisine"
							value={selectedItems}
							options={filteredOptions.map((item) => ({
								value: item.value,
								label: item.value,
							}))}
							className={styles.modalCard__input}
							onChange={(event) => {
								setSelectedItems(event);
								handleInput(event, category, "cuisines", place.id);
							}}
						/>
					</div>
				</>
			)}
			<div className={styles.modalCard__item}>
				<div className={styles.modalCard__itemText}>Photo carousel</div>
				<div className={styles.modalCard__photoCarousel}>
					{place.photoCarousel.map((field, index) => (
						<div className={styles.modalCard__photoCarousel_item}>
							<div>Image {index + 1}</div>
							<div className={styles.modalCard__photoCarousel_wrapper}>
								<div className={styles.modalCard__photoCarousel_inputs}>
									<Input
										value={field.photo}
										placeholder="image link"
										className={styles.modalCard__photoCarousel_input}
										onChange={(event) => handleInput(event, category, "photoCarousel", place.id, index, "photo")}
									/>
									<Input
										value={field.description}
										placeholder="description"
										className={styles.modalCard__photoCarousel_input}
										onChange={(event) => handleInput(event, category, "photoCarousel", place.id, index, "description")}
									/>
								</div>
								{place.photoCarousel.length > 3 ? (
									<MinusCircleOutlined
										className={`dynamic-delete-button ${styles.modalCard__photoCarousel_deleteButton}`}
										onClick={() => changePhotoCarousel(category, "photoCarousel", "delete", place.id, index)}
									/>
								) : null}
							</div>
						</div>
					))}
					<Button type="dashed" onClick={() => changePhotoCarousel(category, "photoCarousel", "add", place.id, place.photoCarousel.length)} icon={<PlusOutlined />}>
						Add field
					</Button>
				</div>
			</div>
		</Card>
	);
}

export default ModalCard;
