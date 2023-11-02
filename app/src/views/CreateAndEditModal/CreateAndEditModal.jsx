import React, { useState, useMemo } from "react";
import { Button, Modal, Select, Card, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import countriesList from "country-list-js";
import axios from "axios";
import ModalCard from "../ModalCard/ModalCard";
import { changeModalVisibilityAC, addCountryAC, editCountryAC } from "../../store/actions/mainActions";
import styles from "./createAndEditModal.module.css";

function CreateAndEditModal() {
	const dispatch = useDispatch();
	const { isModalOpen, modalIndex, modalAction, countries } = useSelector((store) => store.mainStore);
	const options = useMemo(() => countriesList.names().sort(), []);
	const categories = ["Attractions", "Hotels", "Restaurants"];
	const emptyPlaces = {
		attractionEmpty: {
			id: (modalIndex + 1) * 100 * 10 + Date.now(),
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			photoCarousel: [
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
			],
		},
		hotelEmpty: {
			id: (modalIndex + 1) * 100 * 100 + Date.now(),
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			rating: 1,
			website: "",
			photoCarousel: [
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
			],
		},
		restaurantEmpty: {
			id: (modalIndex + 1) * 100 * 1000 + Date.now(),
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			priceRange: "",
			cuisines: [],
			photoCarousel: [
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
				{
					photo: "",
					description: "",
				},
			],
		},
	};

	const [choosenCountry, setChoosenCountry] = useState(() => {
		return modalIndex !== countries.length
			? countries[modalIndex]
			: {
					id: (modalIndex + 1) * 100,
					country: options[0],
					capital: countriesList.findByName(options[0]).capital,
					attractions: [emptyPlaces.attractionEmpty],
					hotels: [emptyPlaces.hotelEmpty],
					restaurants: [emptyPlaces.restaurantEmpty],
			  };
	});

	const [category, setCategory] = useState(categories[0]);

	function addFormInCategory(category) {
		const categoryObject = category.slice(0, -1) + "Empty";
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		const newCard = {};
		Object.assign(newCard, emptyPlaces[categoryObject]);
		newCard.id = changedCountry.id * 100 + Date.now();
		changedCountry[category].push(newCard);
		setChoosenCountry(changedCountry);
	}

	function deleteModalCard(category, id) {
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		changedCountry[category].map((el, index) => {
			if (el.id === id) {
				changedCountry[category].splice(index, 1);
			}
		});
		setChoosenCountry(changedCountry);
	}

	function changeModalCard(category, property, event, id, index, photoCarouselField) {
		const changedCountry = {};

		Object.assign(changedCountry, choosenCountry);
		changedCountry[category].map((el) => {
			if (el.id === id) {
				if (property === "photoCarousel") {
					console.log(el[property]);
					el[property][index][photoCarouselField] = event.target.value;
				} else if (property === "rating" || property === "cuisines") {
					el[property] = event;
				} else el[property] = event.target.value;
			}
		});
		setChoosenCountry(changedCountry);
	}

	function changeCountry(value) {
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		changedCountry.country = value;
		changedCountry.capital = countriesList.findByName(value).capital;
		setChoosenCountry(changedCountry);
	}

	function changePhotoCarousel(category, property, action, id, index) {
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		changedCountry[category].map((el) => {
			if (el.id === id) {
				if (action === "add") {
					el[property].push({
						photo: "",
						description: "",
					});
				}
				if (action === "delete") {
					el[property].splice(index, 1);
				}
			}
		});
		setChoosenCountry(changedCountry);
	}

	const handleCancel = () => {
		dispatch(changeModalVisibilityAC(false));
	};

	async function handleSubmit() {
		try {
			const changedCountry = {};
			Object.assign(changedCountry, choosenCountry);

			let emptyFields = 0;
			for (let key in choosenCountry) {
				if (Array.isArray(choosenCountry[key])) {
					choosenCountry[key].forEach((el) => {
						for (let item in el) {
							if (item === "rating" && el[item] === 0) {
								emptyFields += 1;
								notification.error({
									message: "Incorrect rating",
									description: `Please rate from 1 to 5`,
								});
							}
							if (el[item] === "") {
								emptyFields += 1;
								notification.error({
									message: "Data is not filled in",
									description: `Please fill in the ${item} ${key} information`,
								});
							}
						}
					});
				}
			}
			if (emptyFields === 0) {
				setChoosenCountry(changedCountry);
				let response;
				if (modalIndex !== countries.length) {
					response = await axios.put("http://localhost:4000/countries", choosenCountry);
					if (response.status === 200) {
						dispatch(editCountryAC(choosenCountry));
						dispatch(changeModalVisibilityAC(false));
					} else {
						throw new Error("error");
					}
				} else {
					response = await axios.post("http://localhost:4000/countries", choosenCountry);
					if (response.status === 200) {
						dispatch(addCountryAC(choosenCountry));
						dispatch(changeModalVisibilityAC(false));
					} else {
						throw new Error("error");
					}
				}
			}
		} catch (error) {
			notification.error({
				message: "Error",
				description: error.message,
			});
		}
	}
	const onFinishFailed = (errorInfo) => {
		notification.error({
			message: "Error",
			description: "Check if all fields are filled in",
		});
	};

	return (
		<>
			{isModalOpen === true ? (
				<Modal
					title={`${modalAction} a country`}
					open={isModalOpen}
					onOk={handleSubmit}
					onCancel={handleCancel}
					width="1000px"
					footer={[
						<Button key="cancel" onClick={handleCancel}>
							Cancel
						</Button>,

						<Button key="submit" type="primary" onClick={handleSubmit}>
							Save
						</Button>,
					]}>
					{modalIndex !== countries.length ? (
						<>
							<Select
								className={styles.modal__choice}
								defaultValue={countries[modalIndex].country}
								disabled
								showSearch
								optionFilterProp="children"
								options={options.map((item) => ({
									value: item,
									label: item,
								}))}
							/>
							<Card
								title={
									<div className={styles.modal__item}>
										<div className={styles.modal__itemText}>Select a category</div>
										<Select
											className={styles.modal__input}
											defaultValue={category}
											showSearch
											placeholder="Select a category"
											value={category}
											optionFilterProp="children"
											onChange={(value) => {
												setCategory(value);
											}}
											options={categories.map((item) => ({
												value: item,
												label: item,
											}))}
										/>
									</div>
								}>
								<div className={styles.modal__wrapper}>
									{countries[modalIndex][category.toLowerCase()].map((el, index) => (
										<ModalCard
											country={countries[modalIndex]}
											category={category.toLowerCase()}
											key={index}
											place={el}
											changeModalCard={changeModalCard}
											deleteModalCard={deleteModalCard}
											changePhotoCarousel={changePhotoCarousel}
										/>
									))}
									<Button shape="circle">+</Button>
								</div>
							</Card>
						</>
					) : (
						<>
							<Select
								className={styles.modal__choice}
								value={choosenCountry.country}
								showSearch
								optionFilterProp="children"
								options={options.map((item) => ({
									value: item,
									label: item,
								}))}
								onChange={(value) => changeCountry(value)}
							/>
							<Card
								title={
									<div className={styles.modal__item}>
										<div className={styles.modal__itemText}>Select a category</div>
										<Select
											className={styles.modal__input}
											showSearch
											placeholder="Select a category"
											value={category}
											optionFilterProp="children"
											onChange={(value) => {
												setCategory(value);
											}}
											options={categories.map((item) => ({
												value: item,
												label: item,
											}))}
										/>
									</div>
								}>
								<div className={styles.modal__wrapper}>
									{choosenCountry[category.toLowerCase()].map((el, index) => (
										<ModalCard
											country={choosenCountry}
											category={category.toLowerCase()}
											key={index}
											place={el}
											changeModalCard={changeModalCard}
											deleteModalCard={deleteModalCard}
											changePhotoCarousel={changePhotoCarousel}
										/>
									))}
									<Button shape="circle" onClick={() => addFormInCategory(category.toLowerCase())}>
										+
									</Button>
								</div>
							</Card>
						</>
					)}
				</Modal>
			) : (
				<></>
			)}
		</>
	);
}

export default CreateAndEditModal;
