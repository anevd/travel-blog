const express = require("express");
const router = express.Router();
const collapseItems = require("../db/collapseItems");

router.get("/", function (req, res) {
	res.send(JSON.stringify(collapseItems));
});

router.post("/", function (req, res) {
	const newVideo = req.body;
	const index = collapseItems.findIndex((el) => el.country === newVideo.country);
	if (index === -1) {
		collapseItems.unshift(newVideo);
	} else {
		collapseItems[index].videos.push(newVideo.videos[0]);
	}
	res.status(200).end();
});

router.delete("/:key", function (req, res) {
	const { key } = req.params;
	const index = collapseItems.findIndex((el) => el.key === +key);
	collapseItems.splice(index, 1);
	res.status(200).end();
});

module.exports = router;
