import React, { useState, useMemo } from "react";
import { Button, Modal, Form, Select, Input, Card, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import axios from "axios";
import ModalCard from "../ModalCard/ModalCard";
import { changeModalVisibilityAC } from "../../store/actions/mainActions";
import styles from "./createAndEditModal.module.css";

function CreateAndEditModal({ action, country }) {
	const dispatch = useDispatch();
	const { changesСollection, isModalOpen, modalIndex, countries } = useSelector((store) => store.mainStore);
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const options = useMemo(() => countryList().getData(), []);
	const categories = ["Attractions", "Hotels", "Restaurants"];
	const [category, setCategory] = useState(categories[0]);
	console.log(changesСollection);
	const handleCancel = () => {
		dispatch(changeModalVisibilityAC(false));
	};

	async function handleSubmit() {
		dispatch(changeModalVisibilityAC(false));
		// console.log();
		// try {
		// 	const editedRestaurant = {
		// 		image: newImage,
		// 		name: newName,
		// 		location: newLocation,
		// 		description: newDescription,
		// 		rating: newRating,
		// 		id: +id,
		// 	};
		// 	const response = await axios.put("http://localhost:4000/edit", editedRestaurant);
		// 	if (response.status === 200) {
		// 		dispatch(editCardAC(editedRestaurant));
		// 		navigate("/restaurants");
		// 	} else {
		// 		let errorType = response.status;
		// 		navigate(`/error/${errorType}`);
		// 		throw new Error("error");
		// 	}
		// } catch (error) {
		// 	notification.error({
		// 		message: "Error",
		// 		description: error.message,
		// 	});
		// }
	}
	const onFinishFailed = (errorInfo) => {
		notification.error({
			message: "Error",
			description: "Check if all fields are filled in",
		});
	};

	return (
		<>
			{country.id === modalIndex ? (
				<Modal
					title={`${action} an information`}
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
					<Select
						className={styles.modal__choice}
						defaultValue={country.country}
						disabled
						showSearch
						optionFilterProp="children"
						options={options.map((item) => ({
							value: item.label,
							label: item.label,
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
									onChange={(event) => {
										setCategory(event);
									}}
									options={categories.map((item) => ({
										value: item,
										label: item,
									}))}
								/>
							</div>
						}>
						<div className={styles.modal__wrapper}>
							{country[category.toLowerCase()].map((el, index) => (
								<ModalCard country={country[modalIndex]} category={category.toLowerCase()} key={index} place={el} />
							))}
						</div>
					</Card>
				</Modal>
			) : (
				<></>
			)}
		</>
	);
}

export default CreateAndEditModal;