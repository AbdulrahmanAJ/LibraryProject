var express = require('express')
var router = express.Router()
var controller = require('../controllers/modify.controller')
const {ensureAuthenticated} = require("../config/auth.js")



// create the routing
router.get('/adding', controller.getAdding);
router.post('/add/:model', controller.postAdd);

router.get('/deleting', controller.getDeleting);
router.post('/delete/:model', controller.postDelete);

router.get('/addingBook', ensureAuthenticated, controller.getAddingBook)
router.post('/addBook', ensureAuthenticated, controller.postAddAndEditBook)

router.post('/editBook', ensureAuthenticated, controller.postAddAndEditBook)
router.post('/deleteBook', ensureAuthenticated, controller.postDeleteBook)


module.exports = router