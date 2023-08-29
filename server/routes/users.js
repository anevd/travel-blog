const express = require('express');
const router = express.Router();
const users = require('../db/user')

/* GET users listing. */
router.get('/', function(req, res) {

  res.send(JSON.stringify(users));
});

router.post('/', function(req, res) {
  
  users.push({ id: 456789, name: 'fjl'})
  res.send(JSON.stringify(users));
});

module.exports = router;
