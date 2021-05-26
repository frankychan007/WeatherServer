const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => {
  res.status(200);
  res.send({
    message: 'Welcome to Express API template',
    count: parseInt(Math.random() * 100),
  });
});
module.exports = router;
