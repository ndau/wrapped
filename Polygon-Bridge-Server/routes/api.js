const express = require('express');
const router = express.Router();
const cors = require('cors');
const ApiController = require('../Controllers/api');

const { registered } = require('../middleware/auth');

router.route('/transfer')
.post(ApiController.transfer);

module.exports = router;


