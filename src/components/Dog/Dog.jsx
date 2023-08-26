import React from "react";
import styles from "./dog.module.css";
import dog from "../../json/dog";

function Dog() {
	const randomImageNumber = Math.floor(0 + Math.random() * (dog.images.length - 1 + 1 - 0));
	console.log(randomImageNumber);
	const randomJokeNumber = Math.floor(0 + Math.random() * (dog.jokes.length - 1 + 1 - 0));
	console.log(randomJokeNumber);
	return (
		<div className={styles.dog}>
			<div className={styles.dog__joke}>{dog.jokes[randomJokeNumber].text}</div>
			<img src={dog.images[randomImageNumber].src} alt="dog icon" className={styles.dog__image} />
		</div>
	);
}

export default Dog;
