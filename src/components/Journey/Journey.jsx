import React from "react";
import { Collapse } from "antd";
import { Card } from "antd";
import { Rate } from "antd";
import styles from "./journey.module.css";
import countries from "../../json/countries";
const { Meta } = Card;

const Journey = () => (
	<div className={`container ${styles.journey__content}`}>
		{countries.map((el) => (
			<Card title={el.country} className={styles.journey__card}>
				<Collapse
					className={styles.journey__collapse}
					items={[
						{
							key: "1",
							label: "Attractions",
							children: (
								<div className={styles.journey__collapse_content}>
									{el.attractions.map((el) => (
										<Card className={styles.journey__card_inner} hoverable cover={<img alt={el.name} src={el.photo} />}>
											<Meta title={el.name} description={el.location} />
										</Card>
									))}
								</div>
							),
						},
					]}
				/>
				<Collapse
					className={styles.journey__collapse}
					items={[
						{
							key: "2",
							label: "Hotels",
							children: (
								<div className={styles.journey__collapse_content}>
									{el.hotels.map((el) => (
										<Card className={styles.journey__card_inner} hoverable cover={<img alt={el.name} src={el.photo} />}>
											<Meta title={el.name} description={el.location} />
											<Rate className={styles.journey__card_rate} disabled allowHalf defaultValue={el.rating} />
											<div>
												<a href={el.website} target="_blank" rel="noreferrer" className={styles.journey__card_website}>
													Website
												</a>
											</div>
										</Card>
									))}
								</div>
							),
						},
					]}
				/>
				<Collapse
					className={styles.journey__collapse}
					items={[
						{
							key: "3",
							label: "Restaurants",
							children: (
								<div className={styles.journey__collapse_content}>
									{el.restaurants.map((el) => (
										<Card className={styles.journey__card_inner} hoverable cover={<img alt={el.name} src={el.photo} />}>
											<Meta title={el.name} description={el.location} />
											<h3 className={styles.journey__card_title}>CUISINES:</h3>
											<div>{el.cuisines}</div>
											<h3 className={styles.journey__card_title}>PRICE RANGE:</h3>
											<div>{el.priceRange}</div>
										</Card>
									))}
								</div>
							),
						},
					]}
				/>
			</Card>
		))}
	</div>
);
export default Journey;
