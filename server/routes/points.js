const express = require("express");
const router = express.Router();
const points = require("../db/points");

router.get("/", function (req, res) {
	res.send(JSON.stringify(points));
});

module.exports = router;
