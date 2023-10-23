import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Collapse, Button, Modal, Card, notification } from "antd";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import styles from "./journey.module.css";
import CardItem from "../../components/CardItem/CardItem";
import Dog from "../../components/Dog/Dog";
import CreateAndEditModal from "../../components/CreateAndEditModal/CreateAndEditModal";
import { getDogThunk, getCountriesThunk, deleteCountryAC, changeModalVisibilityAC, changeModalIndexAC, changeModalActionAC } from "../../store/actions/mainActions";
import axios from "axios";
const { confirm } = Modal;

const Journey = () => {
	const dispatch = useDispatch();
	const { dog, countries, isModalOpen } = useSelector((store) => store.mainStore);
	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(countries).length === 0) {
			dispatch(getCountriesThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
	async function showDeleteConfirm(id) {
		confirm({
			title: "Are you sure delete this country?",
			icon: <ExclamationCircleFilled />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					const response = await axios.delete(`http://localhost:4000/countries/${id}`);
					if (response.status === 200) {
						dispatch(deleteCountryAC(id));
					} else {
						throw new Error("error");
					}
				} catch (error) {
					notification.error({
						message: "Error",
						description: error.message,
					});
				}
			},
			onCancel() {
				return;
			},
		});
	}
	const openModal = (index, action) => {
		dispatch(changeModalIndexAC(index));
		dispatch(changeModalActionAC(action));
		dispatch(changeModalVisibilityAC(true));
	};

	return (
		<section className={styles.journey}>
			<div className="container">
				<h2 className={styles.journey__title}>What to visit, where to eat and stay</h2>
				<Form className={styles.journey__panel}>
					<Input addonBefore={<SearchOutlined />} size="large" placeholder="search by country" />
					<Button
						className={styles.journey__panelButton}
						onClick={() => {
							openModal(countries.length, "Add");
						}}>
						Add a country
					</Button>
				</Form>
				{isModalOpen && <CreateAndEditModal />}
				<div className={styles.journey__content}>
					{countries.map((elem, index) => (
						<Card
							key={Date.now() + index}
							title={
								<div className={styles.journey__cardTitle}>
									<div>{elem.country}</div>
									<div>
										<Button
											onClick={() => {
												openModal(index, "Edit");
											}}>
											Edit
										</Button>
										<Button
											className={styles.journey__button_last}
											onClick={() => {
												showDeleteConfirm(elem.id);
											}}>
											Delete
										</Button>
									</div>
								</div>
							}
							className={styles.journey__card}>
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
