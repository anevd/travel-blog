const express = require("express");
const router = express.Router();
const dog = require("../db/dog");

router.get("/", function (req, res) {
	res.send(JSON.stringify(dog));
});

module.exports = router;
