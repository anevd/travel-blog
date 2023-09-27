const express = require("express");
const router = express.Router();
const countries = require("../db/countries");

router.get("/", function (req, res) {
	countries.map((el) => {
		el.attractions.map((elem, index) => {
			elem.id = el.id + index + 1;
			return elem;
		});
		el.hotels.map((elem, index) => {
			elem.id = el.id + index + 20;
			return elem;
		});
		el.restaurants.map((elem, index) => {
			elem.id = el.id + index + 40;
			return elem;
		});
	});
	res.send(JSON.stringify(countries));
});

module.exports = router;
