var express = require('express')
var router = express.Router()
var controller = require('../controllers/modify.controller')



// create the routing
router.get('/adding', controller.getAdding);
router.post('/add/:model', controller.postAdd);

router.get('/deleting', controller.getDeleting);
router.post('/delete/:model', controller.postDelete);

router.get('/addingBook', controller.getAddingBook)
router.post('/addBook', controller.postAddBook)


module.exports = router