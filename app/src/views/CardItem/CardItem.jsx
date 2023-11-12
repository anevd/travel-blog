import React from "react";
import styles from "./cardItem.module.css";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

function CardItem({ name, id, photo, location, description, rating, cuisines, priceRange, country, type }) {
	return (
		<Link to={`/journey/${country}/${type}/${id}`} className={styles.cardItem__inner} onClick={() => window.scrollTo(0, 0)}>
			<Card hoverable cover={<img alt={name} src={photo} className={styles.cardItem__cover} />}>
				<Meta title={name} description={<div className={styles.cardItem__location}>{location}</div>} />
				<div className={styles.cardItem__description}>{type === "attractions" && description}</div>
				{rating && <Rate className={styles.cardItem__rate} disabled allowHalf defaultValue={rating} />}
				{cuisines && (
					<div>
						<h3 className={styles.cardItem__title}>CUISINES:</h3>
						<div className={styles.cardItem__cuisines}>{cuisines.join(", ")}</div>
					</div>
				)}
				{priceRange && (
					<div>
						<h3 className={styles.cardItem__title}>PRICE RANGE:</h3>
						<div>{`$${priceRange[0]} - $${priceRange[1]}`}</div>
					</div>
				)}
			</Card>
		</Link>
	);
}

export default CardItem;
