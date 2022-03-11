const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");

router.get('/user', admin.UserLogin);

router.get('/admin', admin.AdminLogin);

router.get('/admininfo', admin.AdminInfo);

module.exports = router;