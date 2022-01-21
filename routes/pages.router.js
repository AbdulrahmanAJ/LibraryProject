var express = require('express')
var router = express.Router()
var controller = require('../controllers/pages.controller')



// create the routing
router.get('/', controller.getForMainPage)
router.get('/books', controller.getForBooks)
router.get('/authors', controller.getForAuthors)




module.exports = router
