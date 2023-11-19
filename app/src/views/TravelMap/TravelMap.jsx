import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { getDogThunk, getPointsThunk } from "../../store/actions/mainActions";
import Dog from "../../components/Dog/Dog";
import styles from "./travelMap.module.css";

function TravelMap() {
	const dispatch = useDispatch();
	const { dog, points } = useSelector((store) => store.mainStore);
	useEffect(() => {
		if (Object.keys(dog).length === 0) {
			dispatch(getDogThunk());
		}
		if (Object.keys(points).length === 0) {
			dispatch(getPointsThunk());
		}
	}, []);
	const { images: dogImages, jokes: dogJokes } = dog;
	const copy = [...points];
	const features = [];
	copy.forEach((el) => {
		features.push({
			type: "Feature",
			id: el.id,
			geometry: {
				type: "Point",
				coordinates: el.coordinates,
			},
			properties: {
				iconContent: el.content,
				balloonContent: `
							<div class='${styles.balloon}'>
								<h5 class="${styles.balloon__title}">${el.content}</h5>
								<img class="${styles.balloon__image} ${styles.balloon__image_big}" src="${el.image}" alt="${el.content}"/>
							</div>
							`,
				hintContent: `
							<div class="${styles.hint}">
								<h5 class="${styles.hint__title}">${el.content}</h5>
								<img class="${styles.hint__image}" src="${el.image}" alt="${el.content}"/>
							</div>
							`,
			},
		});
	});
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
								defaultFeatures={{
									type: "FeatureCollection",
									features: features,
								}}
								modules={["objectManager.addon.objectsBalloon", "objectManager.addon.objectsHint"]}
							/>
						</Map>
					</div>
				</YMaps>
			</div>
			{Object.keys(dog).length !== 0 && <Dog image={dogImages[2].src} joke={dogJokes[1].text} />}
		</section>
	);
}
export default TravelMap;
