import React from "react";
import { Layout, Menu } from "antd";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderComponent = () => {
	const menu = {
		About: "/",
		Video: "/video",
		Journey: "/journey",
		Map: "/map",
	};
	const menuArray = Object.entries(menu);

	return (
		<Header className={styles.header}>
			<div className={`${styles.header_wrapper} container`}>
				<div className={styles.header_title}>Travel Blog</div>
				<Menu
					theme="dark"
					className={styles.header_menu}
					mode="horizontal"
					collapsedWidth="0"
					items={menuArray.map((el, index) => ({
						key: String(index + 1),
						label: <Link to={el[1]}>{el[0]}</Link>,
					}))}
				/>
			</div>
		</Header>
	);
};

export default HeaderComponent;
