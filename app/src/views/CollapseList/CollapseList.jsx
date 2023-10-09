import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Button, notification } from "antd";
import styles from "./collapseList.module.css";
import Dog from "../../components/Dog/Dog";
import { getDogThunk, getCollapseItemsThunk } from "../../store/actions/mainActions";
import ReactPlayer from "react-player/youtube";
import { deleteVideoAC } from "../../store/actions/mainActions";
import axios from "axios";
const Panel = Collapse.Panel;

const CollapseList = () => {
	const dispatch = useDispatch();
	const { dog, collapseItems } = useSelector((store) => store.mainStore);
	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(collapseItems).length === 0) {
			dispatch(getCollapseItemsThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
	async function deleteVideo(key) {
		try {
			const response = await axios.delete(`http://localhost:4000/collapseItems/${key}`);

			if (response.status === 200) {
				dispatch(deleteVideoAC(key));
			} else {
				throw new Error("error");
			}
		} catch (error) {
			notification.error({
				message: "Error",
				description: error.message,
			});
		}
	}
	return (
		<section className={styles.collapse}>
			<div className="container">
				<h2 className={styles.collapse__title}>Videos about countries to visit</h2>
				<Link to="/add-video">
					<Button className={styles.collapse__button}>Add a video</Button>
				</Link>
				<div className={styles.collapse__content}>
					<Collapse>
						{collapseItems.map((el) => (
							<Panel
								key={el.key}
								header={
									<div className={styles.collapse__header}>
										<div>Watch a video about {el.country}</div>
										<Button
											onClick={() => {
												deleteVideo(el.key);
											}}>
											Delete
										</Button>
									</div>
								}>
								<div className={styles.collapse__video}>
									<ReactPlayer url={el.src} width="100%" height="100%" />
								</div>
							</Panel>
						))}
					</Collapse>
				</div>
			</div>
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[1].src} joke={dogJokes[0].text} />}
		</section>
	);
};

export default CollapseList;
