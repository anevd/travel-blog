const express = require("express");
const router = express.Router();
const helloData = require("../db/about");

router.get("/", function (req, res) {
	res.send(JSON.stringify(helloData));
});

module.exports = router;
