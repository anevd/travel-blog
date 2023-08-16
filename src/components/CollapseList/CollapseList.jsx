import React from "react";
import { Collapse } from "antd";
import styles from "./collapseList.module.css";
import collapseItems from "../../json/collapseItems";

const CollapseList = () => {
	const onChange = (key) => {
		console.log(key);
	};
	return (
		<section className={styles.collapse}>
			<div className="container">
				<h2 className={styles.collapse__title}>Videos about countries to visit</h2>
				<div className={styles.collapse__content}>
					<Collapse items={collapseItems} defaultActiveKey={["0"]} onChange={onChange} />
				</div>
			</div>
		</section>
	);
};

export default CollapseList;
