import React from "react";
import styles from "./travelMap.module.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import points from "../../json/points";

const TravelMap = () => (
	<YMaps
		query={{
			apikey: "d0bb60d8-8b9f-4361-8dad-000a95baa8a3",
		}}>
		<section className={styles.map}>
			<div className="container">
				<h2 className={styles.map__title}>Places I want to visit next year</h2>
				<div className={styles.map__content}>
					<Map className={styles.map__frame} defaultState={{ center: [47.386893, 8.533977], zoom: 5 }}>
						{points.map((point, index) => (
							<Placemark key={index} geometry={point.coordinates} properties={{ iconCaption: point.content }} />
						))}
					</Map>
				</div>
			</div>
		</section>
	</YMaps>
);
export default TravelMap;
