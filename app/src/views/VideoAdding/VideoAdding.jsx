import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./videoAdding.module.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { notification } from "antd";
import { addVideoAC } from "../../store/actions/mainActions";

function VideoAdding() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [country, setCountry] = useState("");
	const [src, setSrc] = useState("");
	const formItemLayout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 },
	};

	const formTailLayout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8, offset: 8 },
	};

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
		console.log("Failed:", errorInfo);
	};
	return (
		<section className={styles.videoAdding}>
			<div className="container">
				<h2 className={styles.videoAdding__title}>Add a video</h2>
				<Form
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
							{...formItemLayout}
							label="Country name"
							name="country"
							rules={[
								{
									required: true,
									message: "Please input a country name",
								},
							]}>
							<Input
								allowClear
								className={styles.form__input}
								value={country}
								onChange={(event) => {
									setCountry(event.target.value);
								}}
							/>
						</Form.Item>

						<Form.Item
							{...formItemLayout}
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
								className={styles.form__input}
								value={src}
								onChange={(event) => {
									setSrc(event.target.value);
								}}
							/>
						</Form.Item>
						<Form.Item {...formTailLayout}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</section>
	);
}

export default VideoAdding;
