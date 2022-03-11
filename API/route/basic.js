const express = require('express')
const router = express.Router()
const basic = require('../controller/basic')

router.get(['/'], basic.getHome)

module.exports = router;