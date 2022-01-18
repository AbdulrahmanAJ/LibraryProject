var express = require('express')
var router = express.Router()
var controller = require('../controllers/pages.controller')



// create the routing
router.get('/', controller.getForMainPage)




module.exports = router
