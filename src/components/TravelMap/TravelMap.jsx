import React from "react";
import styles from "./travelMap.module.css";
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { pointsOnMap } from "../../json/pointsOnMap";

function TravelMap() {
	return (
		<YMaps
			query={{
				apikey: "d0bb60d8-8b9f-4361-8dad-000a95baa8a3",
			}}>
			<section className={styles.map}>
				<div className="container">
					<h2 className={styles.map__title}>Places I want to visit next year</h2>
					<div className={styles.map__content}>
						<Map
							className={styles.map__frame}
							defaultState={{ center: [47.386893, 8.533977], zoom: 5, controls: ["zoomControl", "fullscreenControl"] }}
							modules={["control.ZoomControl", "control.FullscreenControl"]}>
							<ObjectManager
								options={{
									clusterize: true,
									gridSize: 32,
								}}
								objects={{
									openBalloonOnClick: true,
									preset: "islands#nightStretchyIcon",
								}}
								clusters={{
									preset: "islands#nightClusterIcons",
								}}
								defaultFeatures={pointsOnMap}
								modules={["objectManager.addon.objectsBalloon", "objectManager.addon.objectsHint"]}
							/>
						</Map>
					</div>
				</div>
			</section>
		</YMaps>
	);
}
export default TravelMap;
