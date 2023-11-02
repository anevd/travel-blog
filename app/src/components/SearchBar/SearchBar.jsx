import React from "react";
import { Input } from "antd";

function SearchBar({ searchBar, setSearchBar, setResultSearch, type }) {
	return (
		<Input.Search
			allowClear
			placeholder={`search by ${type}`}
			value={searchBar}
			onChange={(event) => {
				if (event.target.value.length === 0) {
					setSearchBar(event.target.value);
					setResultSearch(event.target.value);
				} else {
					setSearchBar(event.target.value);
					setResultSearch(event.target.value[0].toUpperCase() + event.target.value.slice(1).toLowerCase());
				}
			}}
			enterButton
		/>
	);
}

export default SearchBar;
