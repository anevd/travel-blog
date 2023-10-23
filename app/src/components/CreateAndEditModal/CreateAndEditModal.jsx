import React, { useState, useMemo } from "react";
import { Button, Modal, Form, Select, Input, Card, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import countriesList from "country-list-js";
import axios from "axios";
import ModalCard from "../ModalCard/ModalCard";
import { changeModalVisibilityAC, addCountryAC, editCountryAC } from "../../store/actions/mainActions";
import styles from "./createAndEditModal.module.css";
import { useEffect } from "react";
import { contentQuotesLinter } from "@ant-design/cssinjs/lib/linters";

function CreateAndEditModal() {
	const dispatch = useDispatch();
	const { changesСollection, isModalOpen, modalIndex, modalAction, countries } = useSelector((store) => store.mainStore);

	// const [isModalOpen, setIsModalOpen] = useState(false);
	const options = useMemo(() => countriesList.names().sort(), []);
	const categories = ["Attractions", "Hotels", "Restaurants"];
	const emptyPlaces = {
		attractionEmpty: {
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			photoCarousel: [],
		},
		hotelEmpty: {
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			rating: 0,
			website: "",
			photoCarousel: [],
		},
		restaurantEmpty: {
			name: "",
			location: "",
			coordinates: [],
			photo: "",
			description: "",
			priceRange: "",
			cuisines: "",
			photoCarousel: [],
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
		changedCountry[category].push(emptyPlaces[categoryObject]);
		setChoosenCountry(changedCountry);
	}

	function changeModalCard(category, property, event, index) {
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		if (property === "rating") {
			changedCountry[category][index][property] = event;
		} else changedCountry[category][index][property] = event.target.value;
		setChoosenCountry(changedCountry);
	}

	function changeCountry(value) {
		const changedCountry = {};
		Object.assign(changedCountry, choosenCountry);
		changedCountry.country = value;
		changedCountry.capital = countriesList.findByName(value).capital;
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
											index={index}
											changeModalCard={changeModalCard}
											modalIndex={modalIndex}
										/>
									))}
									{/* {countries[modalIndex][category.toLowerCase()].map((el, index) => (
										<ModalCard country={countries[modalIndex]} category={category.toLowerCase()} key={index} place={el} index={index} />
									))} */}
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
										<ModalCard country={choosenCountry} category={category.toLowerCase()} key={index} place={el} index={index} changeModalCard={changeModalCard} />
									))}
									<Button shape="circle" onClick={() => addFormInCategory(category.toLowerCase())}>
										+
									</Button>
								</div>
							</Card>
						</>
					)}

					{/* <Card
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
								<ModalCard country={countries[modalIndex]} category={category.toLowerCase()} key={index} place={el} index={index} />
							))}
							<Button shape="circle" >+</Button>
						</div>
					</Card> */}
				</Modal>
			) : (
				<></>
			)}

			{/* ) : (
					<></>
				);
			})} */}
		</>
	);
}

export default CreateAndEditModal;
