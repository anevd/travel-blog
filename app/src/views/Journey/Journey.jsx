import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Collapse, Button, Modal, Card, Rate, Select, TreeSelect, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./journey.module.css";
import CardItem from "../CardItem/CardItem";
import Dog from "../../components/Dog/Dog";
import CreateAndEditModal from "../CreateAndEditModal/CreateAndEditModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getDogThunk, getCountriesThunk, getCuisinesThunk, deleteCountryAC, changeModalVisibilityAC, changeModalIndexAC, changeModalActionAC } from "../../store/actions/mainActions";
import axios from "axios";
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Attractions", "Hotels", "Restaurants"];
const { SHOW_PARENT } = TreeSelect;

const Journey = () => {
	const dispatch = useDispatch();
	const { dog, countries, cuisines, isModalOpen } = useSelector((store) => store.mainStore);
	const [countrySearch, setCountrySearch] = useState(undefined);
	const [checkedList, setCheckedList] = useState([]);

	const copyCountries = [...countries];
	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
	const options = copyCountries.map((el) => {
		return {
			value: el.country,
			label: el.country,
		};
	});
	useEffect(() => {
		if (Object.keys(cuisines).length === 0) {
			dispatch(getCuisinesThunk());
		}
	}, []);
	const cuisinesCopy = JSON.parse(JSON.stringify(cuisines));
	const treeData = [
		{
			title: "All",
			value: "0-0-0",
			key: "0-0-0",
			children: cuisinesCopy.map((el, index) => {
				el.title = el.value;
				el.value = `0-1-${index}`;
				el.key = el.value;
				return el;
			}),
		},
	];
	const [selectedCuisines, setSelectedCuisines] = useState([]);
	const onCuisinesChange = (newValue) => {
		setSelectedCuisines(newValue);
	};
	const tProps = {
		treeData,
		selectedCuisines,
		onChange: onCuisinesChange,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: "Please select cuisines",
		style: {
			width: "100%",
		},
	};
	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

	const onCheckboxChange = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(countries).length === 0) {
			dispatch(getCountriesThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
	function filterRating(value) {
		console.log(value);
	}

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
				<div className={styles.journey__panel}>
					<div className={styles.journey__panel_searchAndAdd}>
						{/* <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} setCountrySearch={setCountrySearch} /> */}
						<Select
							allowClear
							className={styles.journey__panel_countrySelect}
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
						<Button
							type="primary"
							className={styles.journey__panelButton}
							onClick={() => {
								openModal(countries.length, "Add");
							}}>
							Add a country
						</Button>
					</div>
					<div>
						<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} className={styles.journey__panel_checkboxAll}>
							Check all
						</Checkbox>
						<CheckboxGroup options={plainOptions} value={checkedList} onChange={onCheckboxChange} />
					</div>
					<div>
						{checkedList.indexOf("Hotels") !== -1 && (
							<div className={styles.journey__panelItem}>
								<div className={styles.journey__panelItem_title}>Hotel rating</div>
								<Rate allowHalf defaultValue={1} onChange={(value) => filterRating(value)} className={styles.journey__panelItem_content} />
							</div>
						)}
						{checkedList.indexOf("Restaurants") !== -1 && (
							<div className={styles.journey__panelItem}>
								<div className={styles.journey__panelItem_title}>Cuisines</div>
								<TreeSelect {...tProps} className={styles.journey__panelItem_content} />
							</div>
						)}
					</div>
				</div>

				{isModalOpen && <CreateAndEditModal />}
				<div className={styles.journey__content}>
					{countries.map(
						(elem, index) =>
							(elem.country === countrySearch || countrySearch === undefined) && (
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
							)
					)}
				</div>
			</div>

			{Object.keys(dog).length !== 0 && <Dog image={dogImages[3].src} joke={dogJokes[0].text} />}
		</section>
	);
};
export default Journey;
