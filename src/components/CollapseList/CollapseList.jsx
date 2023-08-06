import React from "react";
import { Collapse } from "antd";
import styles from "./collapseList.module.css";
import collapseItems from "../../json/collapseItems";

const CollapseList = () => {
	const onChange = (key) => {
		console.log(key);
	};
	return (
		<div className={`container ${styles.collapse__content}`}>
			<Collapse items={collapseItems} defaultActiveKey={["0"]} onChange={onChange} />
		</div>
	);
};

export default CollapseList;
