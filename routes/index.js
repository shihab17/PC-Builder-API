const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./userRouter'));
router.use('/auth', require('./authRouter'));

module.exports = router;
