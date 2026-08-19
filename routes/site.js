const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/about', siteController.about);

router.get('/contact', siteController.contact);
router.post('/contact', siteController.handleContact);

router.get('/login', siteController.login);
router.post('/login', siteController.handleLogin);

router.get('/register', siteController.register);
router.post('/register', siteController.handleRegister);

// Bổ sung route Đăng xuất (GET /logout)
router.get('/logout', siteController.logout);

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;