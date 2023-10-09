import React, { useState, useMemo } from "react";
import { Button, Modal, Form, Select, Input, Card, notification } from "antd";
import countryList from "react-select-country-list";
import axios from "axios";
import ModalCard from "../ModalCard/ModalCard";
import styles from "./modal.module.css";

function ModalComponent({ action, country, countries }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const options = useMemo(() => countryList().getData(), []);
	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
	const categories = ["Attractions", "Hotels", "Restaurants"];
	const [category, setCategory] = useState(categories[0]);
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	function showModal(id) {
		setIsModalOpen(true);
	}
	async function onFinish() {
		try {
		} catch (error) {}
	}
	const onFinishFailed = (errorInfo) => {
		notification.error({
			message: "Error",
			description: "Check if all fields are filled in",
		});
	};

	return (
		<>
			<Button onClick={showModal}>Edit</Button>
			{isModalOpen === true ? (
				<Modal title={`${action} an information`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="1000px">
					<Form
						layout="vertical"
						className={styles.form}
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off">
						<div className={styles.form__content}>
							<Form.Item
								className={styles.form__item}
								label="Country"
								name="country"
								rules={[
									{
										required: true,
										message: "Please input a country name",
									},
								]}>
								<Select
									defaultValue={country.country}
									disabled
									showSearch
									optionFilterProp="children"
									options={options.map((item) => ({
										value: item.label,
										label: item.label,
									}))}
								/>
							</Form.Item>
							<Card
								title={
									<Form.Item
										className={styles.form__item}
										label="Select a category"
										name="category"
										rules={[
											{
												required: true,
												message: "Please input a country name",
											},
										]}>
										<Select
											defaultValue={category}
											showSearch
											placeholder="Select a category"
											value={category}
											optionFilterProp="children"
											onChange={(event) => {
												setCategory(event);
											}}
											// filterOption={filterOption}
											options={categories.map((item) => ({
												value: item,
												label: item,
											}))}
										/>
									</Form.Item>
								}>
								<div className={styles.modal__wrapper}>
									{country[category.toLowerCase()].map((el, index) => (
										<ModalCard
											country={country}
											category={category.toLowerCase()}
											key={index}
											id={el.id}
											name={el.name}
											photo={el.photo}
											location={el.location}
											description={el.description}
											rating={el.rating}
											website={el.website}
											priceRange={el.priceRange}
											cuisines={el.cuisines}
										/>
									))}
								</div>
							</Card>
						</div>
					</Form>
				</Modal>
			) : (
				<></>
			)}
		</>
	);
}

export default ModalComponent;
