var express = require('express')
var router = express.Router()
var controller = require('../controllers/pages.controller')
const {ensureAuthenticated} = require("../config/auth.js")



// create the routing
router.get('/', ensureAuthenticated, controller.getForMainPage)
router.get('/books', controller.getForBooks)
router.get('/authors', controller.getForAuthors)




module.exports = router
