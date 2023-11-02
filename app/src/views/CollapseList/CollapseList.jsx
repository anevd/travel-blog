import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Collapse, Button, Modal, Card, Select, Checkbox, DatePicker, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./collapseList.module.css";
import Dog from "../../components/Dog/Dog";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getDogThunk, getCollapseItemsThunk } from "../../store/actions/mainActions";
import ReactPlayer from "react-player/youtube";
import { deleteVideoAC } from "../../store/actions/mainActions";
import axios from "axios";
const { Meta } = Card;
const { confirm } = Modal;
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;

const CollapseList = () => {
	const dispatch = useDispatch();
	const { dog, collapseItems } = useSelector((store) => store.mainStore);
	const [countrySearch, setCountrySearch] = useState(undefined);
	const [searchBar, setSearchBar] = useState(undefined);
	const [videoSearch, setVideoSearch] = useState("");
	const copyCollapseItems = [...collapseItems];
	const videoSearchResult = [];
	const [datePicker, setDatePicker] = useState(null);

	copyCollapseItems.forEach((el) => {
		el.videos.forEach((elem) => {
			if (elem.title.includes(videoSearch) && (el.country === countrySearch || countrySearch === undefined)) {
				videoSearchResult.push(elem);
			}
		});
	});

	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
	const options = copyCollapseItems.map((el) => {
		return {
			value: el.country,
			label: el.country,
		};
	});

	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(collapseItems).length === 0) {
			dispatch(getCollapseItemsThunk());
		}
	}, []);
	useEffect(() => {
		dispatch(getCollapseItemsThunk());
	}, [collapseItems.length]);

	const { images: dogImages, jokes: dogJokes } = dog;
	async function showDeleteConfirm(key) {
		confirm({
			title: "Are you sure delete this country?",
			icon: <ExclamationCircleFilled />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
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
			},
			onCancel() {
				return;
			},
		});
	}

	return (
		<section className={styles.collapse}>
			<div className="container">
				<h2 className={styles.collapse__title}>Videos about countries to visit</h2>
				<div className={styles.collapse__panel}>
					<div className={styles.collapse__panel_countrySearchAndAdding}>
						<Select
							allowClear
							className={styles.collapse__countrySelect}
							size="large"
							showSearch
							placeholder="search by country"
							optionFilterProp="children"
							filterOption={filterOption}
							options={options}
							value={countrySearch}
							onChange={(event) => {
								setCountrySearch(event);
							}}
						/>
						<Link to="/add-video">
							<Button type="primary" className={styles.collapse__button}>
								Add a video
							</Button>
						</Link>
					</div>
					<div className={styles.collapse__panel_title}>Search by video name:</div>
					<SearchBar className={styles.collapse__videoSearch} searchBar={searchBar} setSearchBar={setSearchBar} setResultSearch={setVideoSearch} type="video" />
					<div className={styles.collapse__panel_checkboxAndDatePicker}>
						<RangePicker
							onChange={(value) => {
								if (value !== null) {
									const start = new Date(value[0].$y, value[0].$M, value[0].$D);
									const end = new Date(value[0].$y, value[0].$M, value[0].$D);
									setDatePicker([start, end]);
								} else setDatePicker(value);
							}}
						/>
						<Checkbox className={styles.collapse__panel_checkbox}>Recently Added</Checkbox>
					</div>
				</div>
				{videoSearch.length !== 0 && (
					<div className={styles.collapse__videoResult}>
						{videoSearchResult.map((el, index) => (
							<Card
								key={index}
								className={styles.collapse__video}
								cover={
									<div className={styles.collapse__videoPlayer}>
										<ReactPlayer url={el.src} width="100%" height="100%" />
									</div>
								}>
								{console.log(el.date)}
								<Meta title={el.title} />
							</Card>
						))}
					</div>
				)}
				{videoSearch.length === 0 && (
					<Collapse>
						{collapseItems.map(
							(el) =>
								(el.country === countrySearch || countrySearch === undefined) &&
								datePicker === null && (
									<Panel
										key={el.key}
										header={
											<div className={styles.collapse__header}>
												<div>Watch videos about {el.country}</div>
												<Button
													onClick={(event) => {
														event.stopPropagation();
														showDeleteConfirm(el.key);
													}}>
													Delete
												</Button>
											</div>
										}>
										<div className={styles.collapse__wrapper}>
											{el.videos.map((video, index) => (
												<Card
													key={index}
													className={styles.collapse__video}
													cover={
														<div className={styles.collapse__videoPlayer}>
															<ReactPlayer url={video.src} width="100%" height="100%" />
														</div>
													}>
													<Meta title={video.title} />
												</Card>
											))}
										</div>
									</Panel>
								)
						)}
					</Collapse>
				)}
			</div>
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[1].src} joke={dogJokes[0].text} />}
		</section>
	);
};

export default CollapseList;
