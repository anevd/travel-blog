import { points } from "./points";
import styles from "../components/TravelMap/travelMap.module.css";

let copy = [...points];
let features = [];
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

export const pointsOnMap = {
	type: "FeatureCollection",
	features: features,
};
