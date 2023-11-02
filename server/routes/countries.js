const express = require("express");
const router = express.Router();
const countries = require("../db/countries");

router.get("/", function (req, res) {
	countries.map((el) => {
		el.attractions.map((elem, index) => {
			elem.id = el.id * 10 + index;
			return elem;
		});
		el.hotels.map((elem, index) => {
			elem.id = el.id * 100 + index;
			return elem;
		});
		el.restaurants.map((elem, index) => {
			elem.id = el.id * 1000 + index;
			return elem;
		});
	});
	res.send(JSON.stringify(countries));
});

router.post("/", function (req, res) {
	const newCountry = req.body;
	countries.unshift(newCountry);
	res.status(200).end();
});

router.put("/", function (req, res) {
	const changedCountry = req.body;
	countries.map((el) => {
		if (el.id === changedCountry.id) {
			el.attractions = changedCountry.attractions;
			el.hotels = changedCountry.hotels;
			el.restaurants = changedCountry.restaurants;
		}
	});
	res.status(200).end();
});

router.delete("/:id", function (req, res) {
	const { id } = req.params;
	const index = countries.findIndex((el) => el.id === +id);
	countries.splice(index, 1);
	res.status(200).end();
});

module.exports = router;
