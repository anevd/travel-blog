import React, { useContext } from "react";
import { Collapse } from "antd";
import styles from "./collapseList.module.css";
import collapseItems from "../../json/collapseItems";
import Dog from "../../components/Dog/Dog";
import { globalContext } from "../../contexts/globalContext";

const CollapseList = () => {
	const { dogImages, dogJokes } = useContext(globalContext);
	return (
		<section className={styles.collapse}>
			<div className="container">
				<h2 className={styles.collapse__title}>Videos about countries to visit</h2>
				<div className={styles.collapse__content}>
					<Collapse items={collapseItems} defaultActiveKey={["0"]} />
				</div>
			</div>
			<Dog image={dogImages[1].src} joke={dogJokes[0].text} />
		</section>
	);
};

export default CollapseList;
