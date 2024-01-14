import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Input, Button, Modal, Card, Select, Checkbox, DatePicker, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getDogThunk } from "../../store/actions/dogActions";
import { getCollapseItemsThunk, deleteCollapseItemThunk } from "../../store/actions/collapseActions";
import ReactPlayer from "react-player/youtube";
import Dog from "../../components/Dog/Dog";
import styles from "./collapseList.module.css";
const { Meta } = Card;
const { confirm } = Modal;
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;

const CollapseList = () => {
	const dispatch = useDispatch();
	const { dog } = useSelector((store) => store.dogStore);
	const { collapseItems } = useSelector((store) => store.collapseStore);
	const { images: dogImages, jokes: dogJokes } = dog;
	const [countrySearch, setCountrySearch] = useState(undefined);
	const [searchBar, setSearchBar] = useState(undefined);
	const [videoSearch, setVideoSearch] = useState("");
	const [recentlyAddedChecked, setRecentlyAddedChecked] = useState(false);
	const [datePicker, setDatePicker] = useState(null);

	const copyCollapseItems = [...collapseItems];
	const videoSearchResult = [];
	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
	const options = copyCollapseItems.map((el) => {
		return {
			value: el.country,
			label: el.country,
		};
	});

	copyCollapseItems.forEach((el) => {
		el.videos.forEach((elem) => {
			if (recentlyAddedChecked && datePicker === null && videoSearch === "" && countrySearch === undefined) {
				videoSearchResult.push(elem);
			} else {
				if (datePicker === null) {
					if (elem.title.toLowerCase().indexOf(videoSearch.toLowerCase()) >= 0 && videoSearch !== "" && (el.country === countrySearch || countrySearch === undefined)) {
						videoSearchResult.push(elem);
					}
				} else {
					if (
						(elem.title.toLowerCase().indexOf(videoSearch.toLowerCase()) >= 0 && videoSearch !== "" && (el.country === countrySearch || countrySearch === undefined)) ||
						videoSearch === ""
					) {
						if (datePicker === null || (Date.parse(elem.date) >= datePicker[0].getTime() && Date.parse(elem.date) <= datePicker[1].getTime())) {
							videoSearchResult.push(elem);
						}
					}
				}
			}
		});
	});

	if (recentlyAddedChecked) {
		videoSearchResult.sort((video1, video2) => (Date.parse(video1.date) < Date.parse(video2.date) ? 1 : -1));
	}

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

	async function showDeleteConfirm(key) {
		confirm({
			title: "Are you sure delete this country?",
			icon: <ExclamationCircleFilled />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				try {
					dispatch(deleteCollapseItemThunk(key));
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
							onChange={(value) => {
								setCountrySearch(value);
							}}
						/>
						<Link to="/add-video">
							<Button type="primary" className={styles.collapse__button}>
								Add a video
							</Button>
						</Link>
					</div>
					<div className={styles.collapse__panel_title}>Search by video name:</div>
					<Input.Search
						allowClear
						placeholder="search by video"
						value={searchBar}
						onChange={(event) => {
							if (event.target.value.length === 0) {
								setSearchBar(event.target.value);
								setVideoSearch(event.target.value);
							} else {
								setSearchBar(event.target.value);
								setVideoSearch(event.target.value[0].toUpperCase() + event.target.value.slice(1).toLowerCase());
							}
						}}
						enterButton
					/>
					<div className={styles.collapse__panel_checkboxAndDatePicker}>
						<RangePicker
							onChange={(value) => {
								if (value !== null) {
									const start = new Date(value[0].$y, value[0].$M, value[0].$D);
									const end = new Date(value[1].$y, value[1].$M, value[1].$D);
									setDatePicker([start, end]);
								} else setDatePicker(value);
							}}
						/>
						<Checkbox
							className={styles.collapse__panel_checkbox}
							onChange={(event) => {
								setRecentlyAddedChecked(event.target.checked);
							}}>
							Recently Added
						</Checkbox>
					</div>
				</div>
				{(videoSearch !== "" || videoSearchResult.length !== 0) && (
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
								<Meta title={el.title} />
							</Card>
						))}
					</div>
				)}
				{videoSearch === "" && !recentlyAddedChecked && (
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
