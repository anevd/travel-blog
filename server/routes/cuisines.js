const express = require("express");
const router = express.Router();
const cuisinesData = require("../db/cuisines");

router.get("/", function (req, res) {
	res.send(JSON.stringify(cuisinesData));
});

module.exports = router;
