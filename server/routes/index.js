var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  //fs.readFile
  res.send(JSON.stringify({greetin: 'hello!'}));
});

module.exports = router;
