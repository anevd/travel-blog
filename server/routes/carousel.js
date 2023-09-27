const express = require("express");
const router = express.Router();
const carouselData = require("../db/carousel");

router.get("/", function (req, res) {
	res.send(JSON.stringify(carouselData));
});

module.exports = router;
