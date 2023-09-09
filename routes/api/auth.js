const express = require('express');
const { schemas } = require('../../models/user');
const { validateBody, authenticate, avatarUpload } = require('../../middlewares');

const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, avatarUpload.single('avatar'), ctrl.avatarUpdate);

module.exports = router;
