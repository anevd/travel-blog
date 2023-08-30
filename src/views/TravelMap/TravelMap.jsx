import React, { useContext } from "react";
import styles from "./travelMap.module.css";
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { pointsOnMap } from "../../json/pointsOnMap";
import Dog from "../../components/Dog/Dog";
import { globalContext } from "../../contexts/globalContext";

function TravelMap() {
	const { dogImages, dogJokes } = useContext(globalContext);
	return (
		<section className={styles.map}>
			<div className="container">
				<h2 className={styles.map__title}>Places I want to visit next year</h2>
				<YMaps
					query={{
						apikey: "d0bb60d8-8b9f-4361-8dad-000a95baa8a3",
					}}>
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
				</YMaps>
			</div>
			<Dog image={dogImages[2].src} joke={dogJokes[1].text} />
		</section>
	);
}
export default TravelMap;
