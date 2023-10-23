import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import countriesList from "country-list-js";
import styles from "./videoAdding.module.css";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { notification } from "antd";
import { addVideoAC } from "../../store/actions/mainActions";

function VideoAdding() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [country, setCountry] = useState("");
	const [src, setSrc] = useState("");
	const options = useMemo(() => countriesList.names().sort(), []);
	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	async function onFinish() {
		try {
			const srcRegExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			if (src.match(srcRegExp)) {
				const newVideo = {
					key: Date.now(),
					country: country,
					src: src,
				};
				const response = await axios.post("http://localhost:4000/collapseItems", newVideo);
				if (response.status === 200) {
					notification.success({
						message: "Success",
						description: "The restaurant has been successfully added",
					});
					dispatch(addVideoAC(newVideo));
					setCountry("");
					setSrc("");
					navigate("/video");
				}
			} else {
				throw new Error("error");
			}
		} catch (error) {
			notification.error({
				message: "Error",
				description: "Incorrect Youtube link",
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
		<section className={styles.videoAdding}>
			<div className="container">
				<h2 className={styles.videoAdding__title}>Add a video</h2>
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
								showSearch
								placeholder="Select a country"
								value={country}
								optionFilterProp="children"
								onChange={(event) => {
									setCountry(event);
								}}
								filterOption={filterOption}
								options={options.map((item) => ({
									value: item,
									label: item,
								}))}
							/>
						</Form.Item>
						<Form.Item
							className={styles.form__item}
							label="Link (YouTube)"
							name="src"
							rules={[
								{
									required: true,
									message: "Please input a link to video",
								},
							]}>
							<Input
								allowClear
								value={src}
								onChange={(event) => {
									setSrc(event.target.value);
								}}
							/>
						</Form.Item>
						<Form.Item className={styles.form__item}>
							<Button type="primary" htmlType="submit">
								Add
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</section>
	);
}

export default VideoAdding;
