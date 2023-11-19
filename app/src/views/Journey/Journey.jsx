import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Pagination, Button, Modal, Rate, Select, TreeSelect, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CardItem from "../CardItem/CardItem";
import CountryCard from "../../components/CountryCard/CountryCard";
import Dog from "../../components/Dog/Dog";
import CreateAndEditModal from "../CreateAndEditModal/CreateAndEditModal";
import { getDogThunk, getCountriesThunk, getCuisinesThunk, deleteCountryAC, changeModalVisibilityAC, changeModalIndexAC, changeModalActionAC } from "../../store/actions/mainActions";
import axios from "axios";
import styles from "./journey.module.css";

const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Attractions", "Hotels", "Restaurants"];
const { SHOW_PARENT } = TreeSelect;

const Journey = () => {
	const dispatch = useDispatch();
	const { dog, countries, cuisines, isModalOpen } = useSelector((store) => store.mainStore);
	const { images: dogImages, jokes: dogJokes } = dog;
	const [countrySearch, setCountrySearch] = useState(undefined);
	const [checkedList, setCheckedList] = useState([]);
	const [filteredRating, setFilteredRating] = useState(1);
	const [choosenCheckboxList, setChoosenCheckboxList] = useState(countries);
	const [categoryPlaces, setCategoryPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState(categoryPlaces);
	const [shownCard, setShownCard] = useState({});
	const [page, setPage] = useState(1);
	const elementsPerPage = 2;
	const copyCountries = JSON.parse(JSON.stringify(countries));
	const options = copyCountries.map((el) => {
		return {
			value: el.country,
			label: el.country,
		};
	});
	const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
	useEffect(() => {
		if (Object.keys(cuisines).length === 0) {
			dispatch(getCuisinesThunk());
		}
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(countries).length === 0) {
			dispatch(getCountriesThunk());
		}
	}, []);
	useEffect(() => {
		setChoosenCheckboxList(countries);
		setFilteredPlaces(filteredPlaces);
	}, [countries]);

	const cuisinesCopy = JSON.parse(JSON.stringify(cuisines));
	const treeData = [
		{
			title: "All",
			value: "All",
			key: "0-0-0",
			children: cuisinesCopy.map((el) => {
				el.title = el.value;
				return el;
			}),
		},
	];

	const [selectedCuisines, setSelectedCuisines] = useState([]);

	const onCuisinesChange = (newValue) => {
		setSelectedCuisines(newValue);
		if (checkedList.length === 1) {
			setFilteredPlaces(categoryPlaces);
			if (newValue.length === 0 || newValue[0] === "All") {
				setFilteredPlaces(categoryPlaces);
			} else {
				let filteredList = categoryPlaces.filter(
					(country) => country.places.filter((restaurant) => restaurant.cuisines.filter((cuisine) => newValue.indexOf(cuisine) !== -1).length > 0).length > 0
				);
				setFilteredPlaces(filteredList);
			}
		} else {
			if (newValue.length === 0 || newValue[0] === "All") {
				setChoosenCheckboxList(copyCountries);
			} else {
				let filteredList = copyCountries.filter(
					(country) => country.restaurants.filter((restaurant) => restaurant.cuisines.filter((cuisine) => newValue.indexOf(cuisine) !== -1).length > 0).length > 0
				);
				setChoosenCheckboxList(filteredList);
			}
		}
	};

	const tProps = {
		treeData,
		value: selectedCuisines,
		onChange: onCuisinesChange,
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: "Please select cuisines",
	};

	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

	const onCheckboxChange = (list) => {
		setShownCard({});
		setPage(1);
		const placesList = [];
		setCheckedList(list);
		if (list.length === 1) {
			countries.forEach((country) => {
				placesList.push({
					country: country.country,
					category: list[0],
					places: country[list[0].toLowerCase()],
				});
			});
			setCategoryPlaces(placesList);
			setFilteredPlaces(placesList);
		} else if (list.length === 0) {
			setChoosenCheckboxList(copyCountries);
		} else if (list.length > 1) {
			countries.forEach((country) => {
				const obj = {};
				obj.country = country.country;
				obj.photo = country.photo;
				list.forEach((el) => {
					obj[el.toLowerCase()] = country[el.toLowerCase()];
				});
				placesList.push(obj);
			});
			setChoosenCheckboxList(placesList);
		}
	};

	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	function filterRating(value) {
		setFilteredRating(value);
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
								<Rate allowHalf allowClear={false} value={filteredRating} onChange={(value) => filterRating(value)} className={styles.journey__panelItem_content} />
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
					{checkedList.length === 1 && (
						<>
							{filteredPlaces.map((country, index) => (
								<>
									{index >= page * elementsPerPage - elementsPerPage && index < page * elementsPerPage && (
										<div key={index} className={styles.journey__countryPlaces}>
											{country.places.length !== 0 && (country.country === countrySearch || countrySearch === undefined) && (
												<>
													{(country.category === "Attractions" ||
														(country.category === "Hotels" && country.places.filter((place) => place.rating >= filteredRating).length > 0) ||
														(country.category === "Restaurants" &&
															(country.places.filter((place) => place.cuisines.filter((cuisine) => selectedCuisines.indexOf(cuisine) !== -1).length > 0).length > 0 ||
																selectedCuisines.length === 0 ||
																selectedCuisines.indexOf("All") !== -1))) && (
														<div className={styles.journey__countryHeader}>
															<div className={styles.journey__countryTitle}>Searching results in "{country.country}"</div>
															<Button
																className={styles.journey__panelButton}
																onClick={() => {
																	countries.forEach((el) => {
																		if (el.country === country.country) {
																			setShownCard(el);
																		}
																	});
																}}>
																Show country card
															</Button>
														</div>
													)}
													<div className={styles.journey__countryWrapper}>
														{shownCard.country === country.country && (
															<CountryCard
																country={shownCard}
																shownCard={shownCard}
																setShownCard={setShownCard}
																index={index}
																openModal={openModal}
																showDeleteConfirm={showDeleteConfirm}
																checkedList={[]}
																selectedCuisines={selectedCuisines}
																filteredRating={filteredRating}
															/>
														)}
														{country.places.map((place, i) => (
															<>
																{shownCard.country !== country.country &&
																	(country.category === "Attractions" ||
																		(country.category === "Hotels" && place.rating >= filteredRating) ||
																		(country.category === "Restaurants" &&
																			(place.cuisines.filter((cuisine) => selectedCuisines.indexOf(cuisine) !== -1).length !== 0 ||
																				selectedCuisines.length === 0 ||
																				selectedCuisines.indexOf("All") !== -1))) && (
																		<CardItem
																			key={Date.now() + i}
																			name={place.name}
																			id={place.id}
																			photo={place.photo}
																			location={place.location}
																			description={place.description}
																			rating={place.rating}
																			website={place.website}
																			cuisines={place.cuisines}
																			priceRange={place.priceRange}
																			index={i}
																			country={country.country}
																			type={checkedList[0].toLowerCase()}
																		/>
																	)}
															</>
														))}
													</div>
												</>
											)}
										</div>
									)}
								</>
							))}
						</>
					)}

					{checkedList.length !== 1 && (
						<>
							{choosenCheckboxList.map(
								(country, index) =>
									index >= page * elementsPerPage - elementsPerPage &&
									index < page * elementsPerPage &&
									(country.country === countrySearch || countrySearch === undefined) && (
										<CountryCard
											country={country}
											index={index}
											openModal={openModal}
											showDeleteConfirm={showDeleteConfirm}
											checkedList={checkedList}
											selectedCuisines={selectedCuisines}
											filteredRating={filteredRating}
										/>
									)
							)}
						</>
					)}
				</div>
				<Pagination
					current={page}
					total={countries.length}
					pageSize={elementsPerPage}
					className={styles.journey__pagination}
					onChange={(value) => {
						setShownCard({});
						setPage(value);
					}}
				/>
			</div>

			{Object.keys(dog).length !== 0 && <Dog image={dogImages[3].src} joke={dogJokes[0].text} />}
		</section>
	);
};
export default Journey;
