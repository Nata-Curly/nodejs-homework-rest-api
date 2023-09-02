const express = require('express');
const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/users');

const router = express.Router();

router.patch('/subscription', authenticate, ctrl.updateSubscription);

module.exports = router;
