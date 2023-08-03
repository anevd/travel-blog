import React from "react";
import { Layout, Menu } from "antd";
import styles from "./header.module.css";

const { Header } = Layout;

const HeaderComponent = () => {
	const menu = ["About", "Video", "Journey", "Map"];
	return (
		<Header>
			<div className={`${styles.header} container`}>
				<div className={styles.header_title}>Travel Blog</div>
				<Menu
					theme="dark"
					className={styles.header_menu}
					mode="horizontal"
					defaultSelectedKeys={["4"]}
					items={menu.map((el, index) => ({
						key: String(index + 1),
						label: `${el}`,
					}))}
				/>
			</div>
		</Header>
	);
};

export default HeaderComponent;
