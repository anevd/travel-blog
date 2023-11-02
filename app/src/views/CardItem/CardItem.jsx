import React from "react";
import styles from "./cardItem.module.css";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

function CardItem({ name, id, photo, location, rating, website, cuisines, priceRange, country, type }) {
	return (
		<Link to={`/journey/${country}/${type}/${id}`} className={styles.journey__card_inner} onClick={() => window.scrollTo(0, 0)}>
			<Card hoverable cover={<img alt={name} src={photo} />}>
				<Meta title={name} description={location} />
				{rating && <Rate className={styles.journey__card_rate} disabled allowHalf defaultValue={rating} />}
				{cuisines && (
					<div>
						<h3 className={styles.journey__card_title}>CUISINES:</h3>
						<div>{cuisines.join(", ")}</div>
					</div>
				)}
				{priceRange && (
					<div>
						<h3 className={styles.journey__card_title}>PRICE RANGE:</h3>
						<div>{priceRange}</div>
					</div>
				)}
			</Card>
		</Link>
	);
}

export default CardItem;
